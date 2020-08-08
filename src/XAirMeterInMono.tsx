import React, { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";
import XAirMultiMeter from "./XAirMultiMeter";

type MeterInMonoProps = {
  meterAddress: string;
  channelId: number;
  adUsbAddress: string;
};

export default function XAirMeterInMono({
  meterAddress,
  channelId,
  adUsbAddress,
}: MeterInMonoProps) {
  const [isUsb, setIsUsb] = useState(false);
  const xair = useXAirContext();

  useEffect(() => {
    const adUsbName = xair.subscribe(adUsbAddress, (message) => {
      setIsUsb(message.arguments[0] === 1);
    });

    xair.get(adUsbAddress);

    return () => {
      xair.unsubscribe(adUsbAddress, adUsbName);
    };
  }, [xair, channelId, adUsbAddress]);

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: meterAddress, indices: [channelId] },
        { label: "USB", address: meterAddress, indices: [channelId + 18] },
      ]}
      primary={isUsb ? 1 : 0}
    />
  );
}
