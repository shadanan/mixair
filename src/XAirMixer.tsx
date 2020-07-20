import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { XAir } from "./XAir";
import XAirChannelAuxIn from "./XAirChannelAuxIn";
import XAirChannelBusOut from "./XAirChannelBusOut";
import XAirChannelLrOut from "./XAirChannelLrOut";
import XAirChannelMonoIn from "./XAirChannelMonoIn";
import { XAirContextProvider } from "./XAirContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
    margin: 0,
    width: "100%",
  },
}));

type XAirMixerProps = {
  xair: XAir;
};

export default function XAirMixer({ xair }: XAirMixerProps) {
  const classes = useStyles();

  return (
    <XAirContextProvider xair={xair}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <XAirChannelLrOut
            channelName={"LR"}
            configAddress={"/lr/config"}
            muteAddress={"/lr/mix/on"}
            soloAddress={"/-stat/solosw/50"}
            faderAddress={"/lr/mix/fader"}
          />
        </Grid>
        {Array.from({ length: 6 }, (_, i) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
            <XAirChannelBusOut busId={i + 1} />
          </Grid>
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
            <XAirChannelMonoIn channelId={i} />
          </Grid>
        ))}
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <XAirChannelAuxIn />
        </Grid>
      </Grid>
    </XAirContextProvider>
  );
}
