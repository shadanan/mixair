import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import React, { ReactElement, useEffect, useState } from "react";
import { XAir } from "./XAir";

const useStyles = makeStyles((theme) => ({
  flex: {
    flexGrow: 1,
  },
  well: {
    backgroundColor: theme.palette.background.default,
    paddingLeft: 14,
    paddingRight: 14,
  },
  slider: {
    color: theme.palette.primary.light,
  },
  input: {
    width: 42,
  },
}));

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

type ValueLabelProps = {
  open: boolean;
  value: number;
  children: ReactElement;
};

function ValueLabelComponent({ open, value, children }: ValueLabelProps) {
  return (
    <Tooltip open={open} enterTouchDelay={0} title={value} arrow>
      {children}
    </Tooltip>
  );
}

type FaderProps = {
  xair: XAir;
  address: string;
};

export default function Fader({ xair, address }: FaderProps) {
  const classes = useStyles();
  const [level, setLevel] = useState(0);
  const [levelText, setLevelText] = useState<string | null>(null);

  async function updateLevel(level: number) {
    xair.patch({
      address: address,
      arguments: [level],
    });
  }

  useEffect(() => {
    const name = xair.subscribe((message) => {
      setLevel(message.arguments[0] as number);
    }, address);
    xair.get(address);

    return () => {
      xair.unsubscribe(name);
    };
  }, [xair, address]);

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item className={classes.flex}>
        <Paper className={classes.well}>
          <Slider
            className={classes.slider}
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
        </Paper>
      </Grid>
      <Grid item>
        <Input
          className={classes.input}
          value={levelText ?? dbToString(levelToDb(level), 1)}
          onBlur={() => setLevelText(null)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setLevelText(null);
            }
          }}
          onChange={(event) => {
            setLevelText(event.target.value);
            updateLevel(dbToLevel(Number(event.target.value)));
          }}
          margin="dense"
        ></Input>
      </Grid>
    </Grid>
  );
}
