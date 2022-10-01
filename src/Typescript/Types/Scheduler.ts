import { TimerSession } from "./TimerSession";

// Scheduler for timer study sessions, ie. Pomodoro
export type Scheduler = {
  next(): () => TimerSession; // returns next session in schedule
  currentSession: TimerSession;
};
