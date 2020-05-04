import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Fader from "./Fader";
import { XAir } from "./XAir";
import ToggleButton from "./ToggleButton";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";

type ChannelProps = {
  xair: XAir;
  channelName: string;
  muteAddress: string;
  soloAddress: string;
  faderAddress: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(),
    margin: theme.spacing(),
  },
  flex: {
    flexGrow: 1,
  },
}));

function Channel({
  xair,
  channelName,
  muteAddress,
  soloAddress,
  faderAddress,
}: ChannelProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="caption">{channelName}</Typography>
        </Grid>
        <Grid item>
          <ToggleButton
            xair={xair}
            address={muteAddress}
            color={red[500]}
            invert={true}
          >
            M
          </ToggleButton>
        </Grid>
        <Grid item>
          <ToggleButton xair={xair} address={soloAddress} color={yellow[500]}>
            S
          </ToggleButton>
        </Grid>
        <Grid item className={classes.flex}>
          <Fader xair={xair} address={faderAddress} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Channel;
