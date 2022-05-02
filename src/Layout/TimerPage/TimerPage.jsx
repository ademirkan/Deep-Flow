import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Timer from "../../Components/CircularTimer/Timer";

// SRP -- responsible for displaying timer and progress bar
function TimerPage() {
  return (
    <div
      className="flex justify-center items-center flex-col mt-16"
      style={{ gridArea: "main" }}
    >
      <Timer />
      <ProgressBar />
    </div>
  );
}

export default TimerPage;
