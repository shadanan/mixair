import React, { useEffect, useState } from "react";
import LevelIndicator from "./LevelIndicator";
import { XAir } from "./XAir";

type MeterProps = {
  xair: XAir;
  address: string;
  meter: number;
};

function normalize(level: number): number {
  return Math.max(Math.min(((level + 18432) * 100) / 18432, 100), 0);
}

export default function Meter({ xair, address, meter }: MeterProps) {
  const [level, setLevel] = useState(-32768);

  useEffect(() => {
    const name = xair.subscribe((message) => {
      setLevel(message.arguments[meter] as number);
    }, address);

    return () => {
      xair.unsubscribe(name);
    };
  }, [xair, address, meter]);

  return <LevelIndicator level={normalize(level)} />;
}
