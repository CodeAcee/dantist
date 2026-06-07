import { useEffect, useState } from "react";
import styles from "./LangSwitcher.module.css";

export default function LangSwitcher({ isMobile }: { isMobile: boolean }) {
  const [isEn, setIsEn] = useState(false);

  useEffect(() => {
    setIsEn(window.location.pathname.startsWith("/en"));
  }, []);

  const cls = (active: boolean) =>
    active ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={`${styles.switcher} ${isMobile ? styles.mobile : ""}`}>
      <a href="/" className={cls(!isEn)} aria-current={!isEn ? "page" : undefined}>
        UA
      </a>
      <span className={styles.sep}>/</span>
      <a href="/en/" className={cls(isEn)} aria-current={isEn ? "page" : undefined}>
        EN
      </a>
    </div>
  );
}
