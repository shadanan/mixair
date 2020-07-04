import {
  Grid,
  Input,
  makeStyles,
  Paper,
  Slider,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";

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

const marks = ["-12", "0", "12", "24", "36", "48", "60"].map((x) => ({
  value: levelToUnitInterval(x),
  label: x,
}));

function levelToUnitInterval(level: string): number {
  return (parseFloat(level) + 12) / 72;
}

function unitIntervalToLevel(
  unitInterval: number,
  fractionDigits: number
): string {
  return (72 * unitInterval - 12).toFixed(fractionDigits);
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

type GainProps = {
  gainAddress: string;
};

export default function XAirGain({ gainAddress }: GainProps) {
  const classes = useStyles();
  const [level, setLevel] = useState(0);
  const [levelText, setLevelText] = useState<string | null>(null);
  const xair = useXAirContext();

  async function updateLevel(level: number) {
    xair.patch({
      address: gainAddress,
      arguments: [level],
    });
  }

  useEffect(() => {
    const name = xair.subscribe(gainAddress, (message) => {
      setLevel(message.arguments[0] as number);
    });
    xair.get(gainAddress);

    return () => {
      xair.unsubscribe(gainAddress, name);
    };
  }, [xair, gainAddress]);

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="caption">Gain</Typography>
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
