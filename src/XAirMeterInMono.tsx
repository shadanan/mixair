import React from "react";
import useXAirAddress from "./useXAirAddress";
import XAirMultiMeter from "./XAirMultiMeter";

const METER_ADDRESS = "/meters/2";

type MeterInMonoProps = {
  channelId: number;
  adUsbAddress: string;
};

export default function XAirMeterInMono({
  channelId,
  adUsbAddress,
}: MeterInMonoProps) {
  const isUsb = useXAirAddress<number>(adUsbAddress, 0)[0];

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: METER_ADDRESS, indices: [channelId] },
        { label: "USB", address: METER_ADDRESS, indices: [channelId + 18] },
      ]}
      primary={isUsb ? 1 : 0}
    />
  );
}
