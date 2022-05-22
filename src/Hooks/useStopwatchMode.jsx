import useLocalStorageState from "./useLocalStorageState";
import { SESSION_MODE } from "./../Helpers/enum";
import { useLayoutEffect, useEffect } from "react";
import { useState, useContext } from "react";
import useSessionStorageState from "./useSessionStorageState";
import { ScheduleContext } from "../Contexts/ScheduleContext";

import Setting, {
  CustomizableButtonOptionList,
  InputOption,
} from "./../Components/Setting/Setting";

export function useStopwatchMode() {
  const label = "stopwatch";
  const { minDuration, setMinDuration } = useLocalStorageState(
    "STOPWATCH_MIN",
    60 * 1000 * 30
  );
  const { breakDuration, setBreakDuration } = useLocalStorageState(
    "STOPWATCH_MAX_BREAK",
    60 * 1000 * 5
  );

  // scheduler -- duration, next, currentMode
  const { currentMode, setCurrentMode } = useState(SESSION_MODE.STUDY);

  // if current mode is set to study,
}
