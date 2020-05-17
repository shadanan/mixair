import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { XAir } from "./XAir";

type LabelProps = {
  xair: XAir;
  name: string;
  address: string;
};

export default function XAirLabel({ xair, name, address }: LabelProps) {
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
      {name}
      {label === "" ? "" : `: ${label}`}
    </Typography>
  );
}
