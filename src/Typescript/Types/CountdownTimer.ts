import { TimerView } from "./TimerView";
import { ITimerProps } from "./../Interfaces/ITimerProps";

export type CountdownTimer = (props: ITimerProps) => TimerView;
