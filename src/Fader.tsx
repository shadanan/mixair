import {
  Grid,
  Input,
  makeStyles,
  Paper,
  Slider,
  Tooltip,
} from "@material-ui/core";
import React, { ReactElement, useMemo, useState } from "react";

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
  level: number;
  setLevel: (level: number) => void;
  labeledLevels: string[];
  toUnitInterval: (level: string) => number;
  toLevel: (unitInterval: number, fractionDigits: number) => string;
};

export default function Fader({
  level,
  setLevel,
  labeledLevels,
  toUnitInterval,
  toLevel,
}: FaderProps) {
  const classes = useStyles();
  const [levelText, setLevelText] = useState<string | null>(null);

  const marks = useMemo(
    () =>
      labeledLevels.map((x) => ({
        value: toUnitInterval(x),
        label: x,
      })),
    [labeledLevels, toUnitInterval]
  );

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.flex}>
        <Paper className={classes.well}>
          <Slider
            className={classes.slider}
            getAriaValueText={(unitInterval) => toLevel(unitInterval, 1)}
            valueLabelFormat={(unitInterval) => toLevel(unitInterval, 4)}
            ValueLabelComponent={ValueLabelComponent}
            value={level}
            onChange={(_, value) => {
              if (typeof value === "number") {
                setLevel(value);
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
          value={levelText ?? toLevel(level, 1)}
          onBlur={() => setLevelText(null)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setLevelText(null);
            }
          }}
          onChange={(event) => {
            setLevelText(event.target.value);
            setLevel(toUnitInterval(event.target.value));
          }}
          margin="dense"
        ></Input>
      </Grid>
    </Grid>
  );
}
