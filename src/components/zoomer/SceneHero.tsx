import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneHero.module.css";

export function SceneHero({ lang }: SceneProps) {
  const t = STRINGS[lang].hero;
  return (
    <div className={styles.root}>
      <Ring x="8%" y="15%" size={180} color={C.lime} />
      <Ring x="78%" y="10%" size={120} color={C.cyan} />
      <Ring x="85%" y="65%" size={260} color={C.pink} />
      <Ring x="2%" y="70%" size={90} color={C.purple} />

      <div className={styles.headline}>
        <GradientText colors={[C.lime, C.cyan, C.lime]} animationSpeed={4} className="scene-hl">
          {t.lines[0]}
        </GradientText>
        <GradientText colors={[C.ink, C.lime, C.ink]} animationSpeed={7} className="scene-hl">
          {t.lines[1]}
        </GradientText>
        <GradientText colors={[C.ink, C.cyan, C.ink]} animationSpeed={9} className="scene-hl">
          {t.lines[2]}
        </GradientText>
      </div>

      <p className={styles.sub}>{t.sub}</p>

      <a href="#contact" className="cd-btn cd-btn--lg">
        {t.cta}
      </a>

      <div className={styles.stats}>
        {t.stats.map(([v, l]) => (
          <div key={l} className={styles.stat}>
            <div className={styles.statValue}>{v}</div>
            <div className={styles.statLabel}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
