import React from "react";
import ChipLabel from "./ChipLabel";
import Level from "./Level";
import useXAirAddress from "./useXAirAddress";
import XAirLabeledLevel from "./XAirLabeledLevel";

type LabeledLevelLinearProps = {
  address: string;
  label: string;
  levelStart: number;
  levelStop: number;
  levelStep: number;
};

export default function XAirLabeledLevelLinear({
  address,
  label,
  levelStart,
  levelStop,
  levelStep,
}: LabeledLevelLinearProps) {
  const [level, setLevel] = useXAirAddress<number>(address, 0);

  const labeledLevels = Array.from(
    { length: (levelStop - levelStart) / levelStep + 1 },
    (_, j) => (levelStart + j * levelStep).toString()
  );

  function toUnitInterval(level: string): number {
    return (parseFloat(level) - levelStart) / (levelStop - levelStart);
  }

  function toLevel(unitInterval: number, fractionDigits: number): string {
    return ((levelStop - levelStart) * unitInterval + levelStart).toFixed(
      fractionDigits
    );
  }

  return (
    <XAirLabeledLevel
      label={<ChipLabel label={label} color={0} />}
      fader={
        <Level
          level={level}
          setLevel={setLevel}
          labeledLevels={labeledLevels}
          toLevel={toLevel}
          toUnitInterval={toUnitInterval}
        />
      }
    />
  );
}
