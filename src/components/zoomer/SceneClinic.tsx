import GradientText from "../GradientText";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneClinic.module.css";

const VIDEO_SRC = "";

export function SceneClinic({ isMobile, lang }: SceneProps) {
  const t = STRINGS[lang].clinic;
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <GradientText colors={[C.purple, "#c084fc", C.purple]} animationSpeed={4} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.ink, C.purple, C.ink]} animationSpeed={6} className="scene-hl">
            {t.lines[1]}
          </GradientText>
          <GradientText colors={["#c084fc", C.lime, "#c084fc"]} animationSpeed={5} className="scene-hl">
            {t.lines[2]}
          </GradientText>
        </div>
        <p className={styles.sub}>{t.sub}</p>
        {!isMobile && (
          <div className={styles.stats}>
            {t.stats.map((s) => (
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
            <video autoPlay muted loop playsInline src={VIDEO_SRC} className={styles.videoEl} />
          ) : (
            <div className={styles.videoPlaceholder}>
              <div className={styles.playIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5l11 7-11 7V5z" fill="rgba(168,85,247,0.6)" />
                </svg>
              </div>
              <span className={styles.videoLabel}>{t.videoLabel}</span>
            </div>
          )}
        </div>

        <div className={styles.photos}>
          {t.photos.map((label) => (
            <div key={label} className={styles.photo}>
              <span className={styles.photoLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
