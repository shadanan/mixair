import { Grid, makeStyles } from "@material-ui/core";
import React, { ReactElement } from "react";

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

type LabeledLevelProps = {
  label: ReactElement;
  fader: ReactElement;
};

export default function XAirLabeledLevel({ label, fader }: LabeledLevelProps) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.label} xs={2}>
        {label}
      </Grid>
      <Grid item className={classes.flex}>
        {fader}
      </Grid>
    </Grid>
  );
}
