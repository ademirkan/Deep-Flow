import { formatTime } from "../Helpers/formatTime";
function TextTimer({ seconds, style = {} }) {
  return (
    <div className="text-timer" style={style}>
      {formatTime(seconds)}
    </div>
  );
}

export default TextTimer;
