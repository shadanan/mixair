import React, { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";
import XAirMultiMeter from "./XAirMultiMeter";

const METER_ADDRESS = "/meters/2";
const AD_USB_ADDRESS = "/rtn/aux/preamp/rtnsw";
const AD_CHANNEL_IDS = [16, 17];
const USB_CHANNEL_IDS = [34, 35];

export default function XAirMeterInAux() {
  const [isUsb, setIsUsb] = useState(false);
  const xair = useXAirContext();

  useEffect(() => {
    const adUsbName = xair.subscribe(AD_USB_ADDRESS, (message) => {
      setIsUsb(message.arguments[0] === 1);
    });

    xair.get(AD_USB_ADDRESS);

    return () => {
      xair.unsubscribe(AD_USB_ADDRESS, adUsbName);
    };
  }, [xair]);

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
