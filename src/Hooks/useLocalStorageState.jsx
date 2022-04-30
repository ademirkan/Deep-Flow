import { useState } from "react";
/**
 * Hook that stores value as a state and converts to JSON string to store in local storage.
 * Setter value should be a JSON object
 * @param {String} key
 * @param {JSON} init -- initial JSON value to store with {localStorage.setItem()}
 * @returns
 */
export default function useLocalStorageState(key, init) {
  const [state, setState] = useState(init);
  console.log("IN HHOOK");
  console.log(init);
  return [
    state,
    (value) => {
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
  ];
}
