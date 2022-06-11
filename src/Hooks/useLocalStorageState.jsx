import { useState, useEffect } from "react";

export default function useLocalStorageState(key, init) {
  // if exists in local storage, use that. Else, use init (make sure to account for string JSON).
  let currLocalStorageString = localStorage.getItem(key);

  // initial value to be stored in state
  init = currLocalStorageString ? JSON.parse(currLocalStorageString) : init;

  // State
  const [state, setState] = useState(init);

  // set initial storage value if nothing is currently stored in key
  useEffect(() => {
    if (!currLocalStorageString)
      localStorage.setItem(key, typeof init === "string" ? `"${init}"` : init);
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
