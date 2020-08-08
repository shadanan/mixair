import React from "react";
import useXAirAddress from "./useXAirAddress";
import XAirMultiMeter from "./XAirMultiMeter";

const METER_ADDRESS = "/meters/2";
const AD_USB_ADDRESS = "/rtn/aux/preamp/rtnsw";
const AD_CHANNEL_IDS = [16, 17];
const USB_CHANNEL_IDS = [34, 35];

export default function XAirMeterInAux() {
  const isUsb = useXAirAddress<number>(AD_USB_ADDRESS, 0)[0];

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: METER_ADDRESS, indices: AD_CHANNEL_IDS },
        { label: "USB", address: METER_ADDRESS, indices: USB_CHANNEL_IDS },
      ]}
      primary={isUsb ? 1 : 0}
    />
  );
}
