import { makeStyles, Grid, Input } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import React, { ReactElement, useEffect, useState } from "react";

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

type OscMessage = {
  address: string;
  arguments: [number];
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
  ws: WebSocket;
};

function Fader({ ws }: FaderProps) {
  const classes = useStyles();
  const [level, setLevel] = useState(0);

  async function updateLevel(level: number) {
    const resp = await fetch(
      "http://localhost:8000/xair/XR18-5E-91-5A/osc/lr/mix/fader",
      {
        method: "PATCH",
        body: JSON.stringify({
          address: "/lr/mix/fader",
          arguments: [level],
        } as OscMessage),
      }
    );

    const message = (await resp.json()) as OscMessage;
    setLevel(message.arguments[0]);
  }

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        "http://localhost:8000/xair/XR18-5E-91-5A/osc/lr/mix/fader"
      );
      const message = (await resp.json()) as OscMessage;
      setLevel(message.arguments[0]);
    }
    fetchData();

    ws.onmessage = (resp) => {
      const message = JSON.parse(resp.data) as OscMessage;
      if (message.address === "/lr/mix/fader") {
        setLevel(message.arguments[0]);
      }
    };
  });

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
