import { useState } from "react";
import { useRef } from "react";
export default function useDynamicState(init) {
  const [value, setValue] = useState(init);
  const valueRef = useRef(init);
  valueRef.current = value;
  return [() => valueRef.current, setValue];
}
