import { useState, useEffect } from "react";
/**
 * Hook that stores value as a state and converts to JSON string to store in session storage.
 * Setter value should be a JSON object
 * @param {String} key
 * @param {JSON} init -- initial JSON value to store with {sessionStorage.setItem()}
 * @returns
 */
export default function useSessionStorageState(key, init) {
  // if exists in session storage, use that. Else, use init (make sure to account for string JSON).
  let currValueString = sessionStorage.getItem(key);
  init = currValueString
    ? JSON.parse(currValueString)
    : typeof init === "string"
    ? `"${init}"`
    : init;

  const [state, setState] = useState(init);
  useEffect(() => {
    if (!currValueString) sessionStorage.setItem(key, init);
  }, []);
  return [
    state,
    (value) => {
      setState(value);
      sessionStorage.setItem(
        key,
        typeof value === "string" ? `"${value}"` : JSON.stringify(value)
      );
    },
  ];
}
