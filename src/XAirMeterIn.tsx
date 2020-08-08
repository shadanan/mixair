import React, { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";
import XAirMultiMeter from "./XAirMultiMeter";

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
  }, [xair, adUsbAddress]);

  return (
    <XAirMultiMeter
      meters={[
        { label: "A/D", address: METER_ADDRESS, indices: adChannelIds },
        { label: "USB", address: METER_ADDRESS, indices: usbChannelIds },
      ]}
      primary={isUsb ? 1 : 0}
    />
  );
}
