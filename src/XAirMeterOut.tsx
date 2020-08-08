import React from "react";
import XAirMultiMeter from "./XAirMultiMeter";

type MeterOutProps = {
  address: string;
  channelIds: number[];
  label: string;
};

export default function XAirMeterOut({
  address,
  channelIds,
  label,
}: MeterOutProps) {
  return <XAirMultiMeter meters={[{ label, address, indices: channelIds }]} />;
}
