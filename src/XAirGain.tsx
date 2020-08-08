import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import ChipLabel from "./ChipLabel";
import Fader from "./Fader";
import useXAirAddress from "./useXAirAddress";

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
  label: {
    textAlign: "right",
  },
}));

function toUnitInterval(level: string): number {
  return (parseFloat(level) + 12) / 72;
}

function toLevel(unitInterval: number, fractionDigits: number): string {
  return (72 * unitInterval - 12).toFixed(fractionDigits);
}

type GainProps = {
  gainAddress: string;
};

export default function XAirGain({ gainAddress }: GainProps) {
  const classes = useStyles();
  const [level, setLevel] = useXAirAddress<number>(gainAddress, 0);

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.label} xs={2}>
        <ChipLabel label="Gain" color={0} />
      </Grid>
      <Grid item className={classes.flex}>
        <Fader
          level={level}
          setLevel={setLevel}
          labeledLevels={["-12", "0", "12", "24", "36", "48", "60"]}
          toLevel={toLevel}
          toUnitInterval={toUnitInterval}
        />
      </Grid>
    </Grid>
  );
}
