import { useState, useEffect } from "react";
/**
 * Hook that stores value as a state and converts to JSON string to store in local storage.
 * Setter value should be a JSON object
 * @param {String} key
 * @param {JSON} init -- initial JSON value to store with {sessionStorage.setItem()}
 * @returns
 */
export default function useSessionStorageState(key, init) {
  const [state, setState] = useState(init);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(init));
  }, []);

  return [
    state,
    (value) => {
      setState(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  ];
}
