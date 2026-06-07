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

  const cls = (active: boolean) =>
    active ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={`${styles.switcher} ${isMobile ? styles.mobile : ""}`}>
      <a href={BASE} className={cls(!isEn)} aria-current={!isEn ? "page" : undefined}>
        UA
      </a>
      <span className={styles.sep}>/</span>
      <a
        href={`${BASE}en/`}
        className={cls(isEn)}
        aria-current={isEn ? "page" : undefined}
      >
        EN
      </a>
    </div>
  );
}
