import { useState } from "react";
/**
 * Hook that stores value as a state and converts to JSON string to store in local storage.
 * Setter value should be a JSON object
 * @param {String} key
 * @param {JSON} init -- initial JSON value to store with {localStorage.setItem()}
 * @returns
 */
export default function useLocalStorageState(key, init) {
  // if exists in local storage, use that. Else, use init.
  let currValueString = localStorage.getItem(key);
  init = currValueString ? JSON.parse(currValueString) : init;

  const [state, setState] = useState(init);
  return [
    state,
    (value) => {
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
  ];
}
