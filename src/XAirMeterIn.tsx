import React from "react";
import useXAirAddress from "./useXAirAddress";
import XAirMultiMeter from "./XAirMultiMeter";

type MeterInProps = {
  adChannelIds: number[];
  usbChannelIds: number[];
  adUsbAddress: string;
  meterAddress: string;
};

export default function XAirMeterIn({
  adChannelIds,
  usbChannelIds,
  adUsbAddress,
  meterAddress,
}: MeterInProps) {
  const isUsb = useXAirAddress<number>(adUsbAddress, 0)[0];

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: meterAddress, indices: adChannelIds },
        { label: "USB", address: meterAddress, indices: usbChannelIds },
      ]}
      primary={isUsb ? 1 : 0}
    />
  );
}
