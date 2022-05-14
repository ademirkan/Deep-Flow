import styles from "./NavBar.module.css";
import Config from "./Config/Config";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import { useContext } from "react";
import {
  ChartIcon,
  TimerIcon,
  ShareIcon,
  SettingsIcon,
} from "../../Assets/NavbarIcons";

function NavBar() {
  const { isStarted, isRunning } = useContext(TimerStateContext);
  return (
    <div id={styles.NavBar}>
      <Logo className={isRunning && styles.focused} />
      <Menu className={isStarted ? "hidden" : "visible"} />
      <Config className={isStarted ? "hidden" : "visible"} />
    </div>
  );
}

function Logo({ className }) {
  return (
    <div
      className={styles.logo + " " + className}
      onClick={() => {
        console.log("Logo clicked, clearing storage");
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
      }}
    >
      deepflow
    </div>
  );
}

function Menu({ className }) {
  return (
    <div id={styles.menu} className={className}>
      <a href="/">
        <TimerIcon className={"icon"} />
      </a>
      <a href="/">
        <ChartIcon className={"icon"} />
      </a>
      <a href="/">
        <ShareIcon className={"icon"} />
      </a>
      <a href="/">
        <SettingsIcon className={"icon"} />
      </a>
    </div>
  );
}

export default NavBar;
