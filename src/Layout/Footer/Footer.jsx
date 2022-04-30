import { GithubIcon, ThemeIcon, InfoIcon } from "../../Assets/FooterIcons";
import styles from "./Footer.module.css";
import { useContext } from "react";
import { TimerStateContext } from "./../../Contexts/TimerStateContext";

function Footer() {
  const { isRunning } = useContext(TimerStateContext);
  return (
    <div
      id={styles.footer}
      className={isRunning ? "hidden" : "hidden" /**Change back to visible */}
    >
      <a href="/">
        <GithubIcon className={styles.icon} />
      </a>
      <a href="/">
        <ThemeIcon className={styles.icon} />
      </a>
      <a href="/">
        <InfoIcon className={styles.icon} />
      </a>
    </div>
  );
}

export default Footer;
