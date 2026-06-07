import type { Lang } from "./strings";
import styles from "./LangSwitcher.module.css";

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

export default function LangSwitcher({
  isMobile,
  lang,
}: {
  isMobile: boolean;
  lang: Lang;
}) {
  const isEn = lang === "en";

  return (
    <div
      className={`${styles.switch} ${isMobile ? styles.mobile : ""}`}
      data-active={isEn ? "en" : "ua"}
    >
      <span className={styles.thumb} aria-hidden="true" />
      <a href={BASE} className={styles.opt} aria-current={!isEn ? "page" : undefined}>
        UA
      </a>
      <a
        href={`${BASE}en/`}
        className={styles.opt}
        aria-current={isEn ? "page" : undefined}
      >
        EN
      </a>
    </div>
  );
}
