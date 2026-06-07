import styles from "./RunningLine.module.css";

const MARQUEE_ITEMS = [
  "НЕВІДКЛАДНА ДОПОМОГА",
  "КОСМЕТИЧНА СТОМАТОЛОГІЯ",
  "ВІДБІЛЮВАННЯ",
  "ІМПЛАНТИ",
  "ЕЛАЙНЕРИ",
  "ВІНІРИ",
  "КОРЕНЕВІ КАНАЛИ",
  "ОРТОДОНТІЯ",
  "ІМПЛАНТАЦІЯ",
];

export function RunningLine() {
  const text = MARQUEE_ITEMS.map((i) => `${i} •`).join("  ");
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <span className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
}
