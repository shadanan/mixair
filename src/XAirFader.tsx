import React, { useEffect, useState } from "react";
import Fader from "./Fader";
import { useXAirContext } from "./XAirContext";

function toUnitInterval(level: string): number {
  if (level === "-∞") {
    return 0;
  }
  return 0.75 * Math.pow(10, (Number(level) * Math.log10(1 / 0.75)) / 10);
}

function toLevel(unitInterval: number, fractionDigits: number): string {
  return unitInterval === 0
    ? "-∞"
    : ((10 * Math.log10(unitInterval / 0.75)) / Math.log10(1 / 0.75)).toFixed(
        fractionDigits
      );
}

type FaderProps = {
  address: string;
};

export default function XAirFader({ address }: FaderProps) {
  const [level, setLevel] = useState(0);
  const xair = useXAirContext();

  function updateLevel(level: number) {
    xair.patch({
      address: address,
      arguments: [level],
    });
  }

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      setLevel(message.arguments[0] as number);
    });
    xair.get(address);

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address]);

  return (
    <Fader
      level={level}
      setLevel={updateLevel}
      labeledLevels={["-∞", "-50", "-30", "-20", "-10", "-5", "0", "5", "10"]}
      toLevel={toLevel}
      toUnitInterval={toUnitInterval}
    />
  );
}
