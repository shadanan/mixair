import React from "react";
import XAirLabeledLevelLinear from "./XAirLabeledLevelLinear";

type LabeledLevelTrimProps = {
  address: string;
};

export default function XAirLabeledLevelTrim({
  address,
}: LabeledLevelTrimProps) {
  return (
    <XAirLabeledLevelLinear
      address={address}
      label="USB Trim"
      levelStart={-18}
      levelStop={18}
      levelStep={6}
    />
  );
}
