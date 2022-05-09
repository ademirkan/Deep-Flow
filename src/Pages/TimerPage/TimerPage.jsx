import Progress from "../../Components/ProgressBar/ProgressBar";
import Timer from "./../../Components/CircularTimer/Timer";

function TimerPage() {
  return (
    <div
      className="flex justify-center items-center flex-col mt-16"
      style={{ gridArea: "main" }}
    >
      <Timer />
      <Progress />
    </div>
  );
}

export default TimerPage;
