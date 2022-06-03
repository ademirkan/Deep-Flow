import styles from "./CircularTimer.module.css";

export default function ControlBar({
  isRunning,
  onStart,
  onStop,
  onNext,
  onReset,
}) {
  let controls = !isRunning ? (
    <ControlButton
      icon={
        <i className="fa-solid centered-container fa-circle-play control-icon text-3xl " />
      }
      onClick={onStart}
    />
  ) : (
    <>
      <ControlButton
        icon={
          <i className="fa-solid centered-container fa-clock-rotate-left control-icon" />
        }
        onClick={onReset}
      />
      <ControlButton
        icon={
          <i className="fa-solid centered-container fa-circle-pause control-icon text-3xl" />
        }
        onClick={onStop}
      />
      <ControlButton
        icon={
          <i className="fa-solid centered-container fa-circle-chevron-right control-icon"></i>
        }
        onClick={onNext}
      />
    </>
  );

  return (
    <div id={styles.controlBar} className="flex justify-around h-16 ">
      {controls}
    </div>
  );
}

function ControlButton({ icon, name, onClick }) {
  return (
    <div className="control-button" onClick={onClick}>
      {icon}
    </div>
  );
}
