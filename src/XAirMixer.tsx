import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { XAir } from "./XAir";
import XAirChannel from "./XAirChannel";
import { XAirContextProvider } from "./XAirContext";
import XAirMonoInputChannel from "./XAirMonoInputChannel";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
    margin: 0,
    width: "100%",
  },
}));

type MixerProps = {
  mixer: string;
};

export default function XAirMixer({ mixer }: MixerProps) {
  const classes = useStyles();
  const xair = new XAir(mixer);

  useEffect(() => {
    return () => {
      xair.close();
    };
  }, [xair]);

  return (
    <XAirContextProvider xair={xair}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <XAirChannel
            channelName={"LR"}
            nameAddress={"/lr/config/name"}
            muteAddress={"/lr/mix/on"}
            soloAddress={"/-stat/solosw/50"}
            faderAddress={"/lr/mix/fader"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <XAirChannel
            channelName={"Aux"}
            nameAddress={"/rtn/aux/config/name"}
            muteAddress={"/rtn/aux/mix/on"}
            soloAddress={"/-stat/solosw/17"}
            faderAddress={"/rtn/aux/mix/fader"}
            meterId={17}
          />
        </Grid>
        {Array.from({ length: 16 }, (_, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
              <XAirMonoInputChannel channelId={i} />
            </Grid>
          );
        })}
      </Grid>
    </XAirContextProvider>
  );
}
