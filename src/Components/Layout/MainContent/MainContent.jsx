import CircularTimer from "../../CircularTimer/CircularTimer";
function MainContent() {
  return (
    <div
      className="main-container centered-container"
      style={{ gridArea: "main" }}
    >
      <div className="timer-container centered-container">
        <CircularTimer
          thickness={0.03}
          duration={1 * 1000 * 60}
        ></CircularTimer>
      </div>
    </div>
  );
}

export default MainContent;
