import { green } from "@material-ui/core/colors";
import UsbIcon from "@material-ui/icons/Usb";
import React from "react";
import XAirToggleButton from "./XAirToggleButton";

type XAirMuteButtonProps = {
  address: string;
};

export default function XAirToggleButtonAdUsb({
  address,
}: XAirMuteButtonProps) {
  return (
    <XAirToggleButton address={address} color={green[500]}>
      <UsbIcon />
    </XAirToggleButton>
  );
}
