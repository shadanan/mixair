import React from "react";
import XAirFader from "./XAirFader";
import XAirLabel from "./XAirLabel";
import XAirLabeledLevel from "./XAirLabeledLevel";

type LabeledLevelFaderProps = {
  faderAddress: string;
  configAddress: string;
  altLabelName: string;
};

export default function XAirLabeledLevelFader({
  faderAddress,
  configAddress,
  altLabelName,
}: LabeledLevelFaderProps) {
  return (
    <XAirLabeledLevel
      label={<XAirLabel configAddress={configAddress} alt={altLabelName} />}
      fader={<XAirFader address={faderAddress} />}
    />
  );
}
