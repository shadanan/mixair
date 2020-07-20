import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import XAirFader from "./XAirFader";
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

type LabeledFaderProps = {
  faderAddress: string;
  configAddress: string;
  altLabelName: string;
};

export default function XAirLabeledFader({
  faderAddress,
  configAddress,
  altLabelName,
}: LabeledFaderProps) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.label} xs={2}>
        <XAirLabel configAddress={configAddress} alt={altLabelName} />
      </Grid>
      <Grid item className={classes.flex}>
        <XAirFader address={faderAddress} />
      </Grid>
    </Grid>
  );
}
