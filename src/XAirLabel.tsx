import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { XAir } from "./XAir";

type LabelProps = {
  xair: XAir;
  address: string;
  prefix?: string;
  alt?: string;
};

export default function XAirLabel({ xair, address, prefix, alt }: LabelProps) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      setLabel(message.arguments[0] as string);
    });
    xair.get(address);

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address]);

  return (
    <Typography variant="caption">
      {prefix}
      {prefix && (label || alt) ? ": " : ""}
      {label || alt}
    </Typography>
  );
}
