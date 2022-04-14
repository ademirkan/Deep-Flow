import { GithubIcon, ThemeIcon, InfoIcon } from "../../../Assets/FooterIcons";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div id={styles.footer}>
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
