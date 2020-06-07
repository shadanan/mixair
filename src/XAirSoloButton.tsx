import { yellow } from "@material-ui/core/colors";
import React from "react";
import { XAir } from "./XAir";
import XAirToggleButton from "./XAirToggleButton";

type XAirSoloButtonProps = {
  xair: XAir;
  address: string;
};

export default function XAirSoloButton({ xair, address }: XAirSoloButtonProps) {
  return (
    <XAirToggleButton xair={xair} address={address} color={yellow[500]}>
      S
    </XAirToggleButton>
  );
}
