import { isNil } from "ramda";
import React, { createContext, ReactNode, useContext, useMemo, useReducer } from "react";
import { Spark } from "types";

type ActiveOrbitProviderProps = {
  children: ReactNode;
};

type State = {
  sparks: Spark[];
};

type Action = {
  type: "update_orbit_store";
  payload: Spark[];
};

const initialState: State = {
  sparks: []
};

const lastOrbitFromLocalStorage = localStorage.getItem("lastOrbit");

// Set initial sparks state based on whether lastOrbit is available in localStorage
if (lastOrbitFromLocalStorage) {
  const parsed = JSON.parse(lastOrbitFromLocalStorage!);

  if (!isNil(lastOrbitFromLocalStorage) && isListOfSpark(parsed)) {
    initialState.sparks = parsed;
  }
}

function activeOrbitReducer(state: State, action: Action) {
  switch (action.type) {
    case "update_orbit_store":
      localStorage.setItem("lastOrbit", JSON.stringify(action.payload));
      return { sparks: action.payload };
    default:
      return state;
  }
}

type ActiveOrbitContextType = State;
type Dispatch = (action: Action) => void;

const ActiveOrbitContext = createContext<ActiveOrbitContextType | undefined>(undefined);
const ActiveOrbitDispatchContext = createContext<Dispatch | undefined>(undefined);

function ActiveOrbitProvider({ children }: ActiveOrbitProviderProps) {
  const [state, dispatch] = useReducer(activeOrbitReducer, initialState);

  const contextValue = useMemo(() => state, [state]);

  return (
    <ActiveOrbitContext.Provider value={contextValue}>
      <ActiveOrbitDispatchContext.Provider value={dispatch}>{children}</ActiveOrbitDispatchContext.Provider>
    </ActiveOrbitContext.Provider>
  );
}

ActiveOrbitContext.displayName = "ActiveOrbitContext";
ActiveOrbitDispatchContext.displayName = "ActiveOrbitDispatchContext";

function useActiveOrbitStore() {
  const context = useContext(ActiveOrbitContext);
  if (context === undefined) {
    throw new Error("useActiveOrbitStore must be used within a ActiveOrbitProvider");
  }
  return context;
}

function useActiveOrbitUpdateDispatch() {
  const context = React.useContext(ActiveOrbitDispatchContext);
  if (context === undefined) {
    throw new Error("useActiveOrbitUpdateDispatch must be used within a ActiveOrbitProvider");
  }
  return context;
}

function isListOfSpark(arg: any): arg is Spark[] {
  // TODO: improve this logic to determine if the list is of sparks
  return arg !== undefined && typeof arg === "object" && Boolean(arg.length);
}

export { ActiveOrbitProvider, useActiveOrbitStore, useActiveOrbitUpdateDispatch };
