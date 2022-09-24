import { Time } from "../Types/Time";
import { TimerViewConstructor } from "../Types/TimerViewConstructor";
import { ITimerCallbacks } from "./ITimerCallbacks";

export interface ITimerProps {
  viewConstructor: TimerViewConstructor;
  targetDuration: Time;
  callbacks: ITimerCallbacks;
}
