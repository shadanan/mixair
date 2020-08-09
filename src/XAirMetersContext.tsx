import React, { ReactElement, useContext } from "react";
import useXAirAddress from "./useXAirAddress";

type Meters = {
  [address: string]: number[];
};

export const XAirMetersContext = React.createContext<Meters>({} as Meters);

export function useMetersContext() {
  return useContext(XAirMetersContext);
}

type XAirMetersContextProviderProps = {
  children: ReactElement;
};

const init: number[] = [];
export function XAirMetersContextProvider({
  children,
}: XAirMetersContextProviderProps) {
  const meters2 = useXAirAddress("/meters/2", init)[0];
  const meters5 = useXAirAddress("/meters/5", init)[0];

  return (
    <XAirMetersContext.Provider
      value={{
        "/meters/2": meters2,
        "/meters/5": meters5,
      }}
    >
      {children}
    </XAirMetersContext.Provider>
  );
}
