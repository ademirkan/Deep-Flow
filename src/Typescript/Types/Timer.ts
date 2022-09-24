import { ITimerProps } from "./../Interfaces/ITimerProps";
import { CountdownTimer } from "./CountdownTimer";
import { StopwatchTimer } from "./StopwatchTimer";
import { TimerView } from "./TimerView";

export type Timer = StopwatchTimer | CountdownTimer;
