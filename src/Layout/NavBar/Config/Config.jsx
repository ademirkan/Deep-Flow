import styles from "./Config.module.css";
import { useState, useContext } from "react";
import { TimerStateContext } from "../../../Contexts/TimerStateContext";
import Popup from "reactjs-popup";
import useLocalStorageState from "./../../../Hooks/useLocalStorageState";
import { PomodoroMode } from "./../../../Components/PomodoroMode";
import { StopwatchMode } from "../../../Components/StopwatchMode";

export default function Config() {
  const { isRunning } = useContext(TimerStateContext);
  const [mode, setMode] = useLocalStorageState("studyMode", "pomodoro");
  const [config, setConfig] = useState(<div></div>);

  function handleSelect(m, config = {}) {
    if (m !== mode) {
      setMode(m);
    }
    if (config) setConfig(() => config);
  }

  const modes = {
    pomodoro: (isActive) => (
      <PomodoroMode
        key="pomodoro"
        isActive={isActive}
        onSelect={handleSelect}
        setConfig={setConfig}
      />
    ),
    stopwatch: (isActive) => (
      <StopwatchMode
        key="stopwatch"
        isActive={isActive}
        onSelect={handleSelect}
        setConfig={setConfig}
      />
    ),

    // custom: (isActive) => <CustomMode isActive={isActive} />,
  };

  return (
    <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
      <span id="config-mode">
        {Object.entries(modes).map((m) => {
          console.log(mode);
          console.log(m[0]);
          console.log(m[0] === mode);
          console.log(typeof m[0]);
          console.log(typeof mode);
          return m[1](m[0] === mode);
        })}
      </span>
      <Popup
        trigger={
          <i className="fa-solid fa-screwdriver-wrench relative inline mx-1 h-1 w-1 "></i>
        }
        modal
        nested
      >
        {config}
      </Popup>
    </div>
  );
}
