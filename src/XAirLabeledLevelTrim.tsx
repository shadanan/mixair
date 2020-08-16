import React from "react";
import ChipLabel from "./ChipLabel";
import Level from "./Level";
import useXAirAddress from "./useXAirAddress";
import XAirLabeledLevel from "./XAirLabeledLevel";

const TRIM_ADDRESS = "/rtn/aux/preamp/rtntrim";

function toUnitInterval(level: string): number {
  return (parseFloat(level) + 18) / 36;
}

function toLevel(unitInterval: number, fractionDigits: number): string {
  return (36 * unitInterval - 18).toFixed(fractionDigits);
}

export default function XAirLabeledLevelTrim() {
  const [level, setLevel] = useXAirAddress<number>(TRIM_ADDRESS, 0);

  return (
    <XAirLabeledLevel
      label={<ChipLabel label="Trim" color={0} />}
      fader={
        <Level
          level={level}
          setLevel={setLevel}
          labeledLevels={["-18", "-12", "-6", "0", "6", "12", "18"]}
          toLevel={toLevel}
          toUnitInterval={toUnitInterval}
        />
      }
    />
  );
}
