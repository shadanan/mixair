import React, { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";
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
        { label: "A/D", address: METER_ADDRESS, indices: [channelId] },
        { label: "USB", address: METER_ADDRESS, indices: [channelId + 18] },
      ]}
      primary={isUsb ? 1 : 0}
    />
  );
}
