import { Grid, Input, makeStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import React, { ReactElement, useEffect, useState } from "react";
import { XAir } from "./XAir";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 250,
    padding: 18,
  },
  slider: {
    color: theme.palette.primary.light,
  },
  input: {
    width: 42,
  },
}));

type ValueLabelProps = {
  open: boolean;
  value: number;
  children: ReactElement;
};

const marks = [Number.NEGATIVE_INFINITY, -50, -30, -20, -10, -5, 0, 5, 10].map(
  (x) => ({
    value: dbToLevel(x),
    label: dbToString(x, 0),
  })
);

function dbToString(db: number, fractionDigits: number): string {
  return db === Number.NEGATIVE_INFINITY ? "-∞" : db.toFixed(fractionDigits);
}

function dbToLevel(db: number): number {
  if (db === Number.NEGATIVE_INFINITY) {
    return 0;
  }
  return 0.75 * Math.pow(10, (Number(db) * Math.log10(1 / 0.75)) / 10);
}

function levelToDb(level: number): number {
  return level === 0
    ? Number.NEGATIVE_INFINITY
    : (10 * Math.log10(level / 0.75)) / Math.log10(1 / 0.75);
}

function ValueLabelComponent({ open, value, children }: ValueLabelProps) {
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="left"
      title={value}
      arrow
    >
      {children}
    </Tooltip>
  );
}

type FaderProps = {
  xair: XAir;
};

function Fader({ xair }: FaderProps) {
  const classes = useStyles();
  const [level, setLevel] = useState(0);

  async function updateLevel(level: number) {
    const message = await xair.patch({
      address: "/lr/mix/fader",
      arguments: [level],
    });
    setLevel(message.arguments[0]);
  }

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      const message = await xair.get("/lr/mix/fader");
      setLevel(message.arguments[0]);
    }
    fetchData();
  }, [xair]);

  useEffect(() => {
    const name = xair.subscribe((message) => {
      setLevel(message.arguments[0]);
    }, "/lr/mix/fader");
    return () => {
      xair.unsubscribe(name);
    };
  }, [xair]);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Input
          className={classes.input}
          value={dbToString(levelToDb(level), 1)}
          onChange={(event) => {
            updateLevel(dbToLevel(Number(event.target.value)));
          }}
          margin="dense"
        ></Input>
      </Grid>
      <Grid item>
        <div className={classes.root}>
          <Slider
            className={classes.slider}
            orientation="vertical"
            getAriaValueText={(level) => dbToString(levelToDb(level), 1)}
            valueLabelFormat={(level) => dbToString(levelToDb(level), 4)}
            ValueLabelComponent={ValueLabelComponent}
            value={level}
            onChange={(_, value) => {
              if (typeof value === "number") {
                updateLevel(value);
              }
            }}
            aria-label="custom thumb label"
            marks={marks}
            min={0}
            step={0.001}
            max={1}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default Fader;
