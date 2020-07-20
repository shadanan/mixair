import React from "react";
import XAirChannelOut from "./XAirChannelOut";

export default function XAirChannelOutLr() {
  return (
    <XAirChannelOut
      channelName={"LR"}
      configAddress={"/lr/config"}
      muteAddress={"/lr/mix/on"}
      soloAddress={"/-stat/solosw/50"}
      faderAddress={"/lr/mix/fader"}
      meterIds={[6, 7]}
    />
  );
}
