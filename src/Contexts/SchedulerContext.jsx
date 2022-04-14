import react, { useState } from "react";

const SchedulerContext = react.createContext({
  /**
   * numStudy => how many study sessions completed so far in current pomodoro
   * studyDurationMs = length of study
   * shortBreakDurationMs = short break durationMs
   * longBreakDurationMs = lng break
   * longBreakReq = num study for long break
   */

  numStudyCompleted: 0,
  studyDurationMs: 25 * 60 * 1000,
  shortBreakDurationMs: 5 * 60 * 1000,
  longBreakDurationMs: 15 * 60 * 1000,
  longBreakReq: 4,
});

function SchedulerContextProvider({ children }) {
  const [numStudyCompleted, setNumStudyCompleted] = useState(0);

  return <SchedulerContext.Provider value={{numStudyCompleted, }}>{children}</SchedulerContext.Provider>;
}
