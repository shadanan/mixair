import React from "react";
import ChipLabel from "./ChipLabel";
import useXAirAddress from "./useXAirAddress";

type LabelProps = {
  configAddress: string;
  prefix?: string;
  alt?: string;
};

export default function XAirLabel({ configAddress, prefix, alt }: LabelProps) {
  const label = useXAirAddress<string>(`${configAddress}/name`, "")[0];
  const color = useXAirAddress<number>(`${configAddress}/color`, 0)[0];

  return (
    <ChipLabel
      label={[prefix, label || alt].filter((el) => el != null).join(": ")}
      color={color}
    />
  );
}
