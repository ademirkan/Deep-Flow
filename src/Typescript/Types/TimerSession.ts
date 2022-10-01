import { TimerType } from "../enums/TimerType";
import { Time } from "./Time";

export type TimerSession = {
  targetDuration: Time;
  timerType: TimerType;
  isBreak: boolean;
};
