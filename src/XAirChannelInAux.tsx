import React from "react";
import XAirChannelIn from "./XAirChannelIn";

export default function XAirChannelInAux() {
  return (
    <XAirChannelIn
      channelName="17"
      channelAddress="/rtn/aux"
      labelPrefix="Aux"
      adChannelIds={[16, 17]}
      usbChannelIds={[34, 35]}
      gainLevelStop={20}
      gainLevelStep={6}
    />
  );
}
