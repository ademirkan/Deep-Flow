import react, { useState } from "react";

import useLocalStorageState from "./../Hooks/useLocalStorageState";

export const SessionsContext = react.createContext({
  sessions: [],
  setSessions: () => {},
});

export default function SessionsProvider({ children }) {
  const [sessions, setSessions] = useLocalStorageState("sessions", []);

  return (
    <SessionsContext.Provider
      value={{
        sessions,
        setSessions,
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
}
