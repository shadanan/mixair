import React, { ReactElement, useContext } from "react";
import { XAir } from "./XAir";

export const XAirContext = React.createContext<XAir>({} as XAir);

export function useXAirContext() {
  return useContext(XAirContext);
}

type XAirContextProviderProps = {
  xair: XAir;
  children: ReactElement;
};

export function XAirContextProvider({
  xair,
  children,
}: XAirContextProviderProps) {
  return <XAirContext.Provider value={xair}>{children}</XAirContext.Provider>;
}
