import Box from "@material-ui/core/Box";
import React from "react";
import Channel from "./Channel";
import { XAir } from "./XAir";

type MixerProps = {
  xair: XAir;
};

export default function Mixer({ xair }: MixerProps) {
  return (
    <Box>
      <Channel
        xair={xair}
        channelName={"LR"}
        nameAddress={"/lr/config/name"}
        muteAddress={"/lr/mix/on"}
        soloAddress={"/-stat/solosw/50"}
        faderAddress={"/lr/mix/fader"}
      />
      <Channel
        xair={xair}
        channelName={"Aux"}
        nameAddress={"/rtn/aux/config/name"}
        muteAddress={"/rtn/aux/mix/on"}
        soloAddress={"/-stat/solosw/17"}
        faderAddress={"/rtn/aux/mix/fader"}
        meterId={17}
      />
      {Array.from({ length: 16 }, (_, i) => {
        const channelLabel = String(i + 1).padStart(2, "0");
        return (
          <Channel
            key={channelLabel}
            xair={xair}
            channelName={channelLabel}
            nameAddress={`/ch/${channelLabel}/config/name`}
            muteAddress={`/ch/${channelLabel}/mix/on`}
            soloAddress={`/-stat/solosw/${channelLabel}`}
            faderAddress={`/ch/${channelLabel}/mix/fader`}
            meterId={i}
          />
        );
      })}
    </Box>
  );
}
