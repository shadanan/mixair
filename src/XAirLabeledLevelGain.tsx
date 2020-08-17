import React from "react";
import XAirLabeledLevelLinear from "./XAirLabeledLevelLinear";

type LabeledLevelGainProps = {
  address: string;
  levelStop: number;
  levelStep: number;
};

export default function XAirLabeledLevelGain({
  address,
  levelStop,
  levelStep,
}: LabeledLevelGainProps) {
  return (
    <XAirLabeledLevelLinear
      address={address}
      label="A/D Gain"
      levelStart={-12}
      levelStop={levelStop}
      levelStep={levelStep}
    />
  );
}
