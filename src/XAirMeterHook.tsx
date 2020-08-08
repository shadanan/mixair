import { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";

export default function useXAirMeter(meterAddress: string) {
  const [levels, setLevels] = useState(Array.from({ length: 36 }, () => 0));
  const xair = useXAirContext();

  useEffect(() => {
    const meterName = xair.subscribe(meterAddress, (message) => {
      setLevels(message.arguments as number[]);
    });

    return () => {
      xair.unsubscribe(meterAddress, meterName);
    };
  }, [xair, meterAddress]);

  return levels;
}
