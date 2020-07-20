import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

type XAirMeterMonoInProps = {
  meterAddress: string;
  channelId: number;
  adUsbAddress: string;
};

export default function XAirMeterMonoIn({
  meterAddress,
  channelId,
  adUsbAddress,
}: XAirMeterMonoInProps) {
  const [levels, setLevels] = useState([-32768, -32768]);
  const [isUsb, setIsUsb] = useState(false);
  const xair = useXAirContext();

  useEffect(() => {
    const meterName = xair.subscribe(meterAddress, (message) => {
      setLevels([
        message.arguments[channelId] as number,
        message.arguments[channelId + 18] as number,
      ]);
    });

    const adUsbName = xair.subscribe(adUsbAddress, (message) => {
      setIsUsb(message.arguments[0] === 1);
    });

    xair.get(adUsbAddress);

    return () => {
      xair.unsubscribe(meterAddress, meterName);
      xair.unsubscribe(adUsbAddress, adUsbName);
    };
  }, [xair, meterAddress, channelId, adUsbAddress]);

  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: [levels[0]], primary: !isUsb },
        { label: "USB", levels: [levels[1]], primary: isUsb },
      ]}
    />
  );
}
