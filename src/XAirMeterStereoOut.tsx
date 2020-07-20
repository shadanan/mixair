import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

type XAirMeterStereoOutProps = {
  address: string;
  channelIds: number[];
  label: string;
};

export default function XAirMeterOut({
  address,
  channelIds,
  label,
}: XAirMeterStereoOutProps) {
  const [levels, setLevels] = useState([-32768, -32768]);
  const xair = useXAirContext();

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      setLevels(channelIds.map((id) => message.arguments[id] as number));
    });

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address, channelIds]);

  return <MultiMeter meters={[{ label, levels }]} />;
}
