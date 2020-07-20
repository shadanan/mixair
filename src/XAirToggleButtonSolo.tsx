import { yellow } from "@material-ui/core/colors";
import React from "react";
import XAirToggleButton from "./XAirToggleButton";

type ToggleButtonSoloProps = {
  address: string;
};

export default function XAirToggleButtonSolo({
  address,
}: ToggleButtonSoloProps) {
  return (
    <XAirToggleButton address={address} color={yellow[500]}>
      S
    </XAirToggleButton>
  );
}
