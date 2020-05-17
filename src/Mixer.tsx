import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import Channel from "./Channel";
import { XAir } from "./XAir";

type MixerProps = {
  mixer: string;
};

export default function Mixer({ mixer }: MixerProps) {
  const xair = new XAir(`${window.location.host}/xair/${mixer}`);

  useEffect(() => {
    return () => {
      xair.close();
    };
  }, [xair]);

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Channel
          xair={xair}
          channelName={"LR"}
          nameAddress={"/lr/config/name"}
          muteAddress={"/lr/mix/on"}
          soloAddress={"/-stat/solosw/50"}
          faderAddress={"/lr/mix/fader"}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Channel
          xair={xair}
          channelName={"Aux"}
          nameAddress={"/rtn/aux/config/name"}
          muteAddress={"/rtn/aux/mix/on"}
          soloAddress={"/-stat/solosw/17"}
          faderAddress={"/rtn/aux/mix/fader"}
          meterId={17}
        />
      </Grid>
      {Array.from({ length: 16 }, (_, i) => {
        const channelLabel = String(i + 1).padStart(2, "0");
        return (
          <Grid item xs={12} md={6} lg={4} xl={3} key={channelLabel}>
            <Channel
              xair={xair}
              channelName={channelLabel}
              nameAddress={`/ch/${channelLabel}/config/name`}
              muteAddress={`/ch/${channelLabel}/mix/on`}
              soloAddress={`/-stat/solosw/${channelLabel}`}
              faderAddress={`/ch/${channelLabel}/mix/fader`}
              meterId={i}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
