import { Time } from "../Types/Time";

export interface ITimerViewProps {
  targetTime: Time;
  isRunning: boolean;
  isStarted: boolean;
  elapsedTime: Time;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onFinish?: () => void;
  label?: string;
}
