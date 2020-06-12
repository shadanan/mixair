import React, { useEffect, useState } from "react";
import MultiMeter from "./MultiMeter";
import { useXAirContext } from "./XAirContext";

type XAirMonoInMeterProps = {
  address: string;
  channelId: number;
};

export default function XAirMonoInMeter({
  address,
  channelId,
}: XAirMonoInMeterProps) {
  const [levels, setLevels] = useState([-32768, -32768]);
  const xair = useXAirContext();

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      setLevels([
        message.arguments[channelId] as number,
        message.arguments[channelId + 18] as number,
      ]);
    });

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address, channelId]);

  return (
    <MultiMeter
      meters={[
        { label: "A/D", levels: [levels[0]] },
        { label: "USB", levels: [levels[1]] },
      ]}
    />
  );
}
