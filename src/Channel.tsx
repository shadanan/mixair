import { Paper, makeStyles, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Fader from "./Fader";
import { XAir } from "./XAir";
import MuteButton from "./MuteButton";

const xair = new XAir("localhost:8000/xair/XR18-5E-91-5A");

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 6,
  },
}));

function Channel() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="caption">LR</Typography>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item>
          <MuteButton xair={xair} address={"/lr/mix/on"}></MuteButton>
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Fader xair={xair} address={"/lr/mix/fader"} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Channel;
