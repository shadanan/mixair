import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { XAir } from "./XAir";
import XAirChannelAuxIn from "./XAirChannelAuxIn";
import XAirChannelMonoIn from "./XAirChannelMonoIn";
import XAirChannelOutBus from "./XAirChannelOutBus";
import XAirChannelOutLr from "./XAirChannelOutLr";
import { XAirContextProvider } from "./XAirContext";
import { XAirMetersContextProvider } from "./XAirMetersContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
    margin: 0,
    width: "100%",
  },
}));

type MixerProps = {
  xair: XAir;
};

export default function XAirMixer({ xair }: MixerProps) {
  const classes = useStyles();

  return (
    <XAirContextProvider xair={xair}>
      <XAirMetersContextProvider>
        <Grid container spacing={1} className={classes.root}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <XAirChannelOutLr />
          </Grid>
          {Array.from({ length: 6 }, (_, i) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
              <XAirChannelOutBus busId={i + 1} />
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
      </XAirMetersContextProvider>
    </XAirContextProvider>
  );
}
