import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

type MeterOutProps = {
  address: string;
  channelIds: number[];
  label: string;
};

export default function XAirMeterOut({
  address,
  channelIds,
  label,
}: MeterOutProps) {
  const [levels, setLevels] = useState(
    Array.from({ length: channelIds.length }, () => -32768)
  );
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
