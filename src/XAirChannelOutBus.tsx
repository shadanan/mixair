import React from "react";
import XAirChannelOut from "./XAirChannelOut";

type ChannelOutBusProps = {
  busId: number;
};

export default function XAirChannelOutBus({ busId }: ChannelOutBusProps) {
  return (
    <XAirChannelOut
      channelName={`Bus ${busId}`}
      configAddress={`/bus/${busId}/config`}
      muteAddress={`/bus/${busId}/mix/on`}
      soloAddress={`/-stat/solosw/${busId + 39}`}
      faderAddress={`/bus/${busId}/mix/fader`}
      meterIds={[busId - 1]}
    />
  );
}
