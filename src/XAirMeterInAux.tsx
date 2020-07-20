import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

const METER_ADDRESS = "/meters/2";
const AD_USB_ADDRESS = "/rtn/aux/preamp/rtnsw";
const CHANNEL_OFFSET = 16;

export default function XAirMeterInAux() {
  const [levels, setLevels] = useState([-32768, -32768, -32768, -32768]);
  const [isUsb, setIsUsb] = useState(false);
  const xair = useXAirContext();

  useEffect(() => {
    const meterName = xair.subscribe(METER_ADDRESS, (message) => {
      setLevels([
        message.arguments[CHANNEL_OFFSET + 0] as number,
        message.arguments[CHANNEL_OFFSET + 1] as number,
        message.arguments[CHANNEL_OFFSET + 18] as number,
        message.arguments[CHANNEL_OFFSET + 19] as number,
      ]);
    });

    const adUsbName = xair.subscribe(AD_USB_ADDRESS, (message) => {
      setIsUsb(message.arguments[0] === 1);
    });

    xair.get(AD_USB_ADDRESS);

    return () => {
      xair.unsubscribe(METER_ADDRESS, meterName);
      xair.unsubscribe(AD_USB_ADDRESS, adUsbName);
    };
  }, [xair]);

  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: levels.slice(0, 2), primary: !isUsb },
        { label: "USB", levels: levels.slice(2, 4), primary: isUsb },
      ]}
    />
  );
}
