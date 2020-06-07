import { yellow } from "@material-ui/core/colors";
import React from "react";
import XAirToggleButton from "./XAirToggleButton";

type XAirSoloButtonProps = {
  address: string;
};

export default function XAirSoloButton({ address }: XAirSoloButtonProps) {
  return (
    <XAirToggleButton address={address} color={yellow[500]}>
      S
    </XAirToggleButton>
  );
}
