import { red } from "@material-ui/core/colors";
import React from "react";
import XAirToggleButton from "./XAirToggleButton";

type ToggleButtonMuteProps = {
  address: string;
};

export default function XAirToggleButtonMute({
  address,
}: ToggleButtonMuteProps) {
  return (
    <XAirToggleButton address={address} color={red[500]} invert={true}>
      M
    </XAirToggleButton>
  );
}
