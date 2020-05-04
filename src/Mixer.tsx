import { Paper } from "@material-ui/core";
import Channel from "./Channel";
import React from "react";
import { XAir } from "./XAir";

type MixerProps = {
  xair: XAir;
};

export default function Mixer({ xair }: MixerProps) {
  return (
    <Paper>
      <Channel
        xair={xair}
        channelName={"LR"}
        muteAddress={"/lr/mix/on"}
        soloAddress={"/-stat/solosw/50"}
        faderAddress={"/lr/mix/fader"}
      />
      <Channel
        xair={xair}
        channelName={"Aux"}
        muteAddress={"/rtn/aux/mix/on"}
        soloAddress={"/-stat/solosw/17"}
        faderAddress={"/rtn/aux/mix/fader"}
      />
      {Array.from({ length: 16 }, (_, i) => {
        const channelLabel = String(i + 1).padStart(2, "0");
        return (
          <Channel
            key={channelLabel}
            xair={xair}
            channelName={channelLabel}
            muteAddress={`/ch/${channelLabel}/mix/on`}
            soloAddress={`/-stat/solosw/${channelLabel}`}
            faderAddress={`/ch/${channelLabel}/mix/fader`}
          />
        );
      })}
    </Paper>
  );
}
