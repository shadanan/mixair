import { red } from "@material-ui/core/colors";
import React from "react";
import { XAir } from "./XAir";
import XAirToggleButton from "./XAirToggleButton";

type XAirMuteButtonProps = {
  xair: XAir;
  address: string;
};

export default function XAirMuteButton({ xair, address }: XAirMuteButtonProps) {
  return (
    <XAirToggleButton
      xair={xair}
      address={address}
      color={red[500]}
      invert={true}
    >
      M
    </XAirToggleButton>
  );
}
