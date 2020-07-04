import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Fader from "./Fader";
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
  const [level, setLevel] = useState(0);
  const xair = useXAirContext();

  function updateLevel(level: number) {
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
        <Fader
          level={level}
          setLevel={updateLevel}
          labeledLevels={["-12", "0", "12", "24", "36", "48", "60"]}
          toLevel={toLevel}
          toUnitInterval={toUnitInterval}
        />
      </Grid>
    </Grid>
  );
}