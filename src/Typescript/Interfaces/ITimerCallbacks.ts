import { TimerEvent } from "../Types/TimerEvent";
export interface ITimerCallbacks {
  onStart?: () => void;
  onTick?: () => void;
  onResume?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onRestart?: () => void;
  onFinish?: () => void;
  onTickEvents?: TimerEvent[];
}
