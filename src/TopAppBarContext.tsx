import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";

type SetExpandedCallback = Dispatch<SetStateAction<boolean>>;

type UpdateExpandablesAction = {
  type: "register" | "unregister";
  callback: SetExpandedCallback;
};

type AppBarContextProps = {
  mixer: string;
  setMixer: Dispatch<SetStateAction<string>>;
  expandAll: () => void;
  collapseAll: () => void;
  updateExpandables: Dispatch<UpdateExpandablesAction>;
};

export const AppBarContext = React.createContext<AppBarContextProps>(
  {} as AppBarContextProps
);

export function useAppBarContext() {
  return useContext(AppBarContext);
}

type AppBarContextProviderProps = {
  children: ReactElement;
};

export function AppBarContextProvider({
  children,
}: AppBarContextProviderProps) {
  const [mixer, setMixer] = useState("");
  const [expandables, updateExpandables] = useReducer(
    (expandables: SetExpandedCallback[], action: UpdateExpandablesAction) => {
      switch (action.type) {
        case "register":
          expandables.push(action.callback);
          return expandables;
        case "unregister":
          return expandables.filter((callback) => callback !== action.callback);
        default:
          throw new Error();
      }
    },
    []
  );

  function expandAll() {
    expandables.forEach((callback) => callback(true));
  }

  function collapseAll() {
    expandables.forEach((callback) => callback(false));
  }

  return (
    <AppBarContext.Provider
      value={{
        mixer,
        setMixer,
        expandAll,
        collapseAll,
        updateExpandables,
      }}
    >
      {children}
    </AppBarContext.Provider>
  );
}
