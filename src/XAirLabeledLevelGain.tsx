import React from "react";
import ChipLabel from "./ChipLabel";
import Level from "./Level";
import useXAirAddress from "./useXAirAddress";
import XAirLabeledLevel from "./XAirLabeledLevel";

function toUnitInterval(level: string): number {
  return (parseFloat(level) + 12) / 72;
}

function toLevel(unitInterval: number, fractionDigits: number): string {
  return (72 * unitInterval - 12).toFixed(fractionDigits);
}

type LabeledFaderGainProps = {
  address: string;
};

export default function XAirLabeledLevelGain({
  address,
}: LabeledFaderGainProps) {
  const [level, setLevel] = useXAirAddress<number>(address, 0);

  return (
    <XAirLabeledLevel
      label={<ChipLabel label="Gain" color={0} />}
      fader={
        <Level
          level={level}
          setLevel={setLevel}
          labeledLevels={["-12", "0", "12", "24", "36", "48", "60"]}
          toLevel={toLevel}
          toUnitInterval={toUnitInterval}
        />
      }
    />
  );
}
