import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import { XAir } from "./XAir";

type LabelProps = {
  xair: XAir;
  name: string;
  address: string;
};

export default function Label({ xair, name, address }: LabelProps) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    async function fetchData() {
      const message = await xair.get(address);
      setLabel(message.arguments[0] as string);
    }
    fetchData();
  }, [xair, address]);

  useEffect(() => {
    const name = xair.subscribe((message) => {
      setLabel(message.arguments[0] as string);
    }, address);
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
