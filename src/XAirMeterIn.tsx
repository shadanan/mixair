import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

const METER_ADDRESS = "/meters/2";

type MeterInProps = {
  adChannelIds: number[];
  usbChannelIds: number[];
  adUsbAddress: string;
};

export default function XAirMeterIn({
  adChannelIds,
  usbChannelIds,
  adUsbAddress,
}: MeterInProps) {
  const [adLevels, setAdLevels] = useState(
    Array.from({ length: adChannelIds.length }, () => -32768)
  );
  const [usbLevels, setUsbLevels] = useState(
    Array.from({ length: usbChannelIds.length }, () => -32768)
  );
  const [isUsb, setIsUsb] = useState(false);
  const xair = useXAirContext();

  useEffect(() => {
    const meterName = xair.subscribe(METER_ADDRESS, (message) => {
      setAdLevels(adChannelIds.map((id) => message.arguments[id] as number));
      setUsbLevels(usbChannelIds.map((id) => message.arguments[id] as number));
    });

    const adUsbName = xair.subscribe(adUsbAddress, (message) => {
      setIsUsb(message.arguments[0] === 1);
    });

    xair.get(adUsbAddress);

    return () => {
      xair.unsubscribe(METER_ADDRESS, meterName);
      xair.unsubscribe(adUsbAddress, adUsbName);
    };
  }, [xair, adChannelIds, usbChannelIds, adUsbAddress]);

  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: adLevels, primary: !isUsb },
        { label: "USB", levels: usbLevels, primary: isUsb },
      ]}
    />
  );
}
