import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

const ADDRESS = "/meters/2";
const CHANNEL_OFFSET = 16;

export default function XAirAuxInMeter() {
  const [levels, setLevels] = useState([-32768, -32768, -32768, -32768]);
  const xair = useXAirContext();

  useEffect(() => {
    const name = xair.subscribe(ADDRESS, (message) => {
      setLevels([
        message.arguments[CHANNEL_OFFSET + 0] as number,
        message.arguments[CHANNEL_OFFSET + 1] as number,
        message.arguments[CHANNEL_OFFSET + 18] as number,
        message.arguments[CHANNEL_OFFSET + 19] as number,
      ]);
    });

    return () => {
      xair.unsubscribe(ADDRESS, name);
    };
  }, [xair]);

  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: levels.slice(0, 2) },
        { label: "USB", levels: levels.slice(2, 4) },
      ]}
    />
  );
}
