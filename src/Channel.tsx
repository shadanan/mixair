import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Fader from "./Fader";
import MuteButton from "./MuteButton";
import { XAir } from "./XAir";

const xair = new XAir("localhost:8000/xair/XR18-5E-91-5A");

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(),
  },
  flex: {
    flexGrow: 1,
  },
}));

function Channel() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="caption">LR</Typography>
        </Grid>
        <Grid item>
          <MuteButton xair={xair} address={"/lr/mix/on"}></MuteButton>
        </Grid>
        <Grid item className={classes.flex}>
          <Fader xair={xair} address={"/lr/mix/fader"} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Channel;
