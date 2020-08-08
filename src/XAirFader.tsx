import React from "react";
import Fader from "./Fader";
import useXAirAddress from "./useXAirAddress";

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
  const [level, setLevel] = useXAirAddress<number>(address, 0);

  return (
    <Fader
      level={level}
      setLevel={setLevel}
      labeledLevels={["-∞", "-50", "-30", "-20", "-10", "-5", "0", "5", "10"]}
      toLevel={toLevel}
      toUnitInterval={toUnitInterval}
    />
  );
}
