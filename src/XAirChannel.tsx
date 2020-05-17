import { makeStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { XAir } from "./XAir";
import XAirFader from "./XAirFader";
import XAirLabel from "./XAirLabel";
import XAirMeter from "./XAirMeter";
import XAirToggleButton from "./XAirToggleButton";

type ChannelProps = {
  xair: XAir;
  channelName: string;
  nameAddress: string;
  muteAddress: string;
  soloAddress: string;
  faderAddress: string;
  meterId?: number;
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

export default function XAirChannel({
  xair,
  channelName,
  nameAddress,
  muteAddress,
  soloAddress,
  faderAddress,
  meterId,
}: ChannelProps) {
  const classes = useStyles();

  let a2dLevel = <></>;
  let usbLevel = <></>;
  if (meterId !== undefined) {
    a2dLevel = (
      <Grid item>
        <XAirMeter xair={xair} address={"/meters/2"} meter={meterId} />
      </Grid>
    );
    usbLevel = (
      <Grid item>
        <XAirMeter xair={xair} address={"/meters/2"} meter={meterId + 16} />
      </Grid>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <XAirLabel xair={xair} name={channelName} address={nameAddress} />
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <XAirToggleButton
                xair={xair}
                address={muteAddress}
                color={red[500]}
                invert={true}
              >
                M
              </XAirToggleButton>
            </Grid>
            <Grid item>
              <XAirToggleButton
                xair={xair}
                address={soloAddress}
                color={yellow[500]}
              >
                S
              </XAirToggleButton>
            </Grid>
            <Grid item className={classes.flex}>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={1}
              >
                {a2dLevel}
                {usbLevel}
                <Grid item>
                  <XAirFader xair={xair} address={faderAddress} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
