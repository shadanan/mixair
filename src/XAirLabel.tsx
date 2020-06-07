import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";

type LabelProps = {
  address: string;
  prefix?: string;
  alt?: string;
};

export default function XAirLabel({ address, prefix, alt }: LabelProps) {
  const [label, setLabel] = useState("");
  const xair = useXAirContext();

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
