import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Fader from "./Fader";
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
  label: {
    textAlign: "right",
  },
}));

function toUnitInterval(level: string): number {
  if (level === "-∞") {
    return 0;
  }
  return 0.75 * Math.pow(10, (Number(level) * Math.log10(1 / 0.75)) / 10);
}

function toLevel(unitInterval: number, fractionDigits: number): string {
  return unitInterval === 0
    ? "-∞"
    : ((10 * Math.log10(unitInterval / 0.75)) / Math.log10(1 / 0.75)).toFixed(
        fractionDigits
      );
}

type FaderProps = {
  faderAddress: string;
  configAddress: string;
  altLabelName: string;
};

export default function XAirFader({
  faderAddress,
  configAddress,
  altLabelName,
}: FaderProps) {
  const classes = useStyles();
  const [level, setLevel] = useState(0);
  const xair = useXAirContext();

  function updateLevel(level: number) {
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
      <Grid item className={classes.label} xs={2}>
        <XAirLabel configAddress={configAddress} alt={altLabelName} />
      </Grid>
      <Grid item className={classes.flex}>
        <Fader
          level={level}
          setLevel={updateLevel}
          labeledLevels={[
            "-∞",
            "-50",
            "-30",
            "-20",
            "-10",
            "-5",
            "0",
            "5",
            "10",
          ]}
          toLevel={toLevel}
          toUnitInterval={toUnitInterval}
        />
      </Grid>
    </Grid>
  );
}
