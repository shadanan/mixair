import {
  Grid,
  Input,
  makeStyles,
  Paper,
  Slider,
  Tooltip,
} from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";
import XAirLabel from "./XAirLabel";

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

const marks = ["-∞", "-50", "-30", "-20", "-10", "-5", "0", "5", "10"].map(
  (x) => ({
    value: levelToUnitInterval(x),
    label: x,
  })
);

function levelToUnitInterval(level: string): number {
  if (level === "-∞") {
    return 0;
  }
  return 0.75 * Math.pow(10, (Number(level) * Math.log10(1 / 0.75)) / 10);
}

function unitIntervalToLevel(
  unitInterval: number,
  fractionDigits: number
): string {
  return unitInterval === 0
    ? "-∞"
    : ((10 * Math.log10(unitInterval / 0.75)) / Math.log10(1 / 0.75)).toFixed(
        fractionDigits
      );
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
  faderAddress: string;
  labelAddress: string;
  altLabelName: string;
};

export default function XAirFader({
  faderAddress,
  labelAddress,
  altLabelName,
}: FaderProps) {
  const classes = useStyles();
  const [level, setLevel] = useState(0);
  const [levelText, setLevelText] = useState<string | null>(null);
  const xair = useXAirContext();

  async function updateLevel(level: number) {
    xair.patch({
      address: faderAddress,
      arguments: [level],
    });
  }

  useEffect(() => {
    const name = xair.subscribe(faderAddress, (message) => {
      setLevel(message.arguments[0] as number);
    });
    xair.get(faderAddress);

    return () => {
      xair.unsubscribe(faderAddress, name);
    };
  }, [xair, faderAddress]);

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <XAirLabel address={labelAddress} alt={altLabelName} />
      </Grid>
      <Grid item className={classes.flex}>
        <Paper className={classes.well}>
          <Slider
            className={classes.slider}
            getAriaValueText={(level) => unitIntervalToLevel(level, 1)}
            valueLabelFormat={(level) => unitIntervalToLevel(level, 4)}
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
          value={levelText ?? unitIntervalToLevel(level, 1)}
          onBlur={() => setLevelText(null)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setLevelText(null);
            }
          }}
          onChange={(event) => {
            setLevelText(event.target.value);
            updateLevel(levelToUnitInterval(event.target.value));
          }}
          margin="dense"
        ></Input>
      </Grid>
    </Grid>
  );
}
