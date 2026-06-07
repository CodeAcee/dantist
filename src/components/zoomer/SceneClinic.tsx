import GradientText from "../GradientText";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneClinic.module.css";

const VIDEO_SRC = "";

const PHOTOS = ["Зал очікування", "Кабінет 1", "Кабінет 2", "Стерилізація"];

const STATS = [
  { num: "200м²", label: "сучасного простору" },
  { num: "5", label: "обладнаних кабінетів" },
  { num: "2021", label: "рік відкриття" },
];

export function SceneClinic({ isMobile }: SceneProps) {
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <GradientText
            colors={[C.purple, "#c084fc", C.purple]}
            animationSpeed={4}
            className="scene-hl"
          >
            ПРОСТІР.
          </GradientText>
          <GradientText
            colors={[C.ink, C.purple, C.ink]}
            animationSpeed={6}
            className="scene-hl"
          >
            В ЯКОМУ
          </GradientText>
          <GradientText
            colors={["#c084fc", C.lime, "#c084fc"]}
            animationSpeed={5}
            className="scene-hl"
          >
            НЕ СТРАШНО.
          </GradientText>
        </div>
        <p className={styles.sub}>
          Сучасне обладнання. Затишна атмосфера. Без стресу.
        </p>
        {!isMobile && (
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.num} className={styles.statRow}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.media}>
        <div className={styles.video}>
          {VIDEO_SRC ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              src={VIDEO_SRC}
              className={styles.videoEl}
            />
          ) : (
            <div className={styles.videoPlaceholder}>
              <div className={styles.playIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5l11 7-11 7V5z" fill="rgba(168,85,247,0.6)" />
                </svg>
              </div>
              <span className={styles.videoLabel}>Відео клініки</span>
            </div>
          )}
        </div>

        <div className={styles.photos}>
          {PHOTOS.map((label) => (
            <div key={label} className={styles.photo}>
              <span className={styles.photoLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
