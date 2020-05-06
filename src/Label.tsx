import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { XAir } from "./XAir";

type LabelProps = {
  xair: XAir;
  name: string;
  address: string;
};

export default function Label({ xair, name, address }: LabelProps) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const name = xair.subscribe((message) => {
      setLabel(message.arguments[0] as string);
    }, address);
    xair.get(address);

    return () => {
      xair.unsubscribe(name);
    };
  }, [xair, address]);

  return (
    <Typography variant="caption">
      {name}
      {label === "" ? "" : `: ${label}`}
    </Typography>
  );
}
