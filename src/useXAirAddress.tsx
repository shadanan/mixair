import { useEffect, useState } from "react";
import { useXAirContext } from "./XAirContext";

export default function useXAirAddress<
  T extends number | string | (number | string)[]
>(address: string, init: T): [T, (value: T) => void] {
  const isArray = Array.isArray(init);
  const [value, setValue] = useState(init);
  const xair = useXAirContext();

  function patchValue(value: T) {
    xair.patch({
      address: address,
      // @ts-ignore
      arguments: isArray ? value : [value],
    });
  }

  useEffect(() => {
    const name = xair.subscribe(address, (message) => {
      // @ts-ignore
      setValue(isArray ? message.arguments : message.arguments[0]);
    });
    xair.get(address);

    return () => {
      xair.unsubscribe(address, name);
    };
  }, [xair, address, isArray]);

  return [value, patchValue];
}
