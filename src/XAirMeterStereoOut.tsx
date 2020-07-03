import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

type XAirStereoOutMeterProps = {
  address: string;
  channelId: number;
};

export default function XAirMeterStereoOut({
  address,
  channelId,
}: XAirStereoOutMeterProps) {
  const [levels, setLevels] = useState([-32768, -32768]);
  const xair = useXAirContext();

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      setLevels([
        message.arguments[channelId] as number,
        message.arguments[channelId + 1] as number,
      ]);
    });

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address, channelId]);

  return <MultiMeter meters={[{ label: "Main", levels }]} />;
}
