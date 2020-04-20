import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Fader from "./Fader";

const client = new WebSocket("ws://localhost:8000/xair/XR18-5E-91-5A/feed");

function Channel() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Paper>
          <Typography>Channel 1</Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <Fader ws={client} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Channel;
