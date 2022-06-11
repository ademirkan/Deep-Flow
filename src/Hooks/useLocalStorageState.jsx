import { useState, useEffect } from "react";
/**
 * Hook that stores value as a state and converts to JSON string to store in local storage.
 * Setter value should be a JSON object
 * @param {String} key
 * @param {JSON} init -- initial JSON value to store with {localStorage.setItem()}
 * @returns
 */

export default function useLocalStorageState(key, init) {
  // if exists in local storage, use that. Else, use init (make sure to account for string JSON).
  let currLocalStorageString = localStorage.getItem(key);

  // sets initial state
  init = currLocalStorageString ? JSON.parse(currLocalStorageString) : init;

  const initJSON = typeof init === "string" ? `"${init}"` : init;

  const [state, setState] = useState(init);
  useEffect(() => {
    if (!currLocalStorageString) localStorage.setItem(key, initJSON);
  }, []);
  return [
    state,
    (value) => {
      setState(value);
      localStorage.setItem(
        key,
        typeof value === "string" ? `"${value}"` : JSON.stringify(value)
      );
    },
  ];
}
