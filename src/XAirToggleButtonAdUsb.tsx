import { green } from "@material-ui/core/colors";
import UsbIcon from "@material-ui/icons/Usb";
import React from "react";
import XAirToggleButton from "./XAirToggleButton";

type ToggleButtonAdUsbProps = {
  address: string;
};

export default function XAirToggleButtonAdUsb({
  address,
}: ToggleButtonAdUsbProps) {
  return (
    <XAirToggleButton address={address} color={green[500]}>
      <UsbIcon />
    </XAirToggleButton>
  );
}
