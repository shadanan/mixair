import React from "react";
import XAirChannelIn from "./XAirChannelIn";

type ChannelInMonoProps = {
  channelId: number;
};

export default function XAirChannelInMono({ channelId }: ChannelInMonoProps) {
  const channelName = String(channelId + 1).padStart(2, "0");

  return (
    <XAirChannelIn
      channelName={channelName}
      channelAddress={`/ch/${channelName}`}
      labelPrefix={channelName}
      adChannelIds={[channelId]}
      usbChannelIds={[channelId + 18]}
      gainLevelStop={60}
      gainLevelStep={12}
    />
  );
}
