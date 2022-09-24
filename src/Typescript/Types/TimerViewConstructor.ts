import { ITimerViewProps } from "../Interfaces/ITimerViewProps";
import { TimerView } from "./TimerView";

export type TimerViewConstructor = (props: ITimerViewProps) => TimerView;
