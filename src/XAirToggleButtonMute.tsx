import { red } from "@material-ui/core/colors";
import React from "react";
import XAirToggleButton from "./XAirToggleButton";

type XAirMuteButtonProps = {
  address: string;
};

export default function XAirToggleButtonMute({ address }: XAirMuteButtonProps) {
  return (
    <XAirToggleButton address={address} color={red[500]} invert={true}>
      M
    </XAirToggleButton>
  );
}
