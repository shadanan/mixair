import React, { useEffect, useState } from "react";
import ChipLabel from "./ChipLabel";
import { useXAirContext } from "./XAirContext";

type LabelProps = {
  configAddress: string;
  prefix?: string;
  alt?: string;
};

export default function XAirLabel({ configAddress, prefix, alt }: LabelProps) {
  const labelAddress = `${configAddress}/name`;
  const colorAddress = `${configAddress}/color`;
  const [label, setLabel] = useState("");
  const [color, setColor] = useState(0);
  const xair = useXAirContext();

  useEffect(() => {
    const name = xair.subscribe(labelAddress, (message) => {
      setLabel(message.arguments[0] as string);
    });
    xair.get(labelAddress);

    return () => {
      xair.unsubscribe(labelAddress, name);
    };
  }, [xair, labelAddress]);

  useEffect(() => {
    const name = xair.subscribe(colorAddress, (message) => {
      setColor(message.arguments[0] as number);
    });
    xair.get(colorAddress);

    return () => {
      xair.unsubscribe(colorAddress, name);
    };
  }, [xair, colorAddress]);

  return (
    <ChipLabel
      label={[prefix, label || alt].filter((el) => el != null).join(": ")}
      color={color}
    />
  );
}
