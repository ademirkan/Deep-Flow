import { Time } from "../Types/Time";
import { TimerEvent } from "../Types/TimerEvent";

export interface ITimerCallbacks {
  onStart?: (currentTime: Time) => void; // first start
  onTick?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // each tick
  onResume?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // each resume
  onPause?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; // each pause
  onEnd?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void; //
  onReset?: (elapsedTime: Time, currentTime: Time, startTime: Time) => void;
  onTickEvents?: Array<TimerEvent>;
}
