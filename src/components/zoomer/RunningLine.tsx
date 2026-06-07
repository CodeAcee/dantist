import { STRINGS, type Lang } from "./strings";
import styles from "./RunningLine.module.css";

export function RunningLine({ lang }: { lang: Lang }) {
  const text = STRINGS[lang].marquee.map((i) => `${i} •`).join("  ");
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <span className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
}
