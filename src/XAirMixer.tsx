import { Button, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { XAir } from "./XAir";
import XAirChannel from "./XAirChannel";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
  },
}));

type MixerProps = {
  mixer: string;
};

export default function XAirMixer({ mixer }: MixerProps) {
  const classes = useStyles();
  const [allExpanded, setAllExpanded] = useState(false);
  const xair = new XAir(`${window.location.host}/xair/${mixer}`);

  useEffect(() => {
    return () => {
      xair.close();
    };
  }, [xair]);

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => setAllExpanded(true)}>
          Expand All
        </Button>
        <Button variant="outlined" onClick={() => setAllExpanded(false)}>
          Collapse All
        </Button>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <XAirChannel
          xair={xair}
          channelName={"LR"}
          nameAddress={"/lr/config/name"}
          muteAddress={"/lr/mix/on"}
          soloAddress={"/-stat/solosw/50"}
          faderAddress={"/lr/mix/fader"}
          expandedDefault={allExpanded}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <XAirChannel
          xair={xair}
          channelName={"Aux"}
          nameAddress={"/rtn/aux/config/name"}
          muteAddress={"/rtn/aux/mix/on"}
          soloAddress={"/-stat/solosw/17"}
          faderAddress={"/rtn/aux/mix/fader"}
          meterId={17}
          expandedDefault={allExpanded}
        />
      </Grid>
      {Array.from({ length: 16 }, (_, i) => {
        const channelLabel = String(i + 1).padStart(2, "0");
        return (
          <Grid item xs={12} md={6} lg={4} xl={3} key={channelLabel}>
            <XAirChannel
              xair={xair}
              channelName={channelLabel}
              nameAddress={`/ch/${channelLabel}/config/name`}
              muteAddress={`/ch/${channelLabel}/mix/on`}
              soloAddress={`/-stat/solosw/${channelLabel}`}
              faderAddress={`/ch/${channelLabel}/mix/fader`}
              meterId={i}
              expandedDefault={allExpanded}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
