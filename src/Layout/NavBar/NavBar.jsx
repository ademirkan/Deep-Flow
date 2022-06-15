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
import { Link } from "react-router-dom";

function NavBar() {
  // Context
  const { isStarted, isRunning } = useContext(TimerStateContext);

  return (
    <div id={styles.NavBar}>
      <Logo className={isRunning && styles.focusedLogo} />
      <Menu className={isStarted ? "hidden" : "visible"} />
      <Config className={isStarted ? "hidden" : "visible"} />
    </div>
  );
}

function Logo({ className }) {
  return (
    <Link to="/">
      <div className={styles.logo + " " + className}>deepflow</div>
    </Link>
  );
}

function Menu({ className }) {
  return (
    <div id={styles.menu} className={className}>
      <Link to="/">
        <TimerIcon className={"icon"} />
      </Link>
      <Link to="/oops">
        <ChartIcon className={"icon"} />
      </Link>
      <Link to="/oops">
        <ShareIcon className={"icon"} />
      </Link>
      <Link to="/oops">
        <SettingsIcon className={"icon"} />
      </Link>
    </div>
  );
}

export default NavBar;
