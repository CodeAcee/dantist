import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneHero.module.css";

const STATS: [string, string][] = [
  ["2400+", "Щасливих посмішок"],
  ["98%", "Повертаються знову"],
  ["4.9", "Google рейтинг"],
];

export function SceneHero(_: SceneProps) {
  return (
    <div className={styles.root}>
      <Ring x="8%" y="15%" size={180} color={C.lime} />
      <Ring x="78%" y="10%" size={120} color={C.cyan} />
      <Ring x="85%" y="65%" size={260} color={C.pink} />
      <Ring x="2%" y="70%" size={90} color={C.purple} />

      <div className={styles.headline}>
        <GradientText
          colors={[C.lime, C.cyan, C.lime]}
          animationSpeed={4}
          className="scene-hl"
        >
          ТВОЯ
        </GradientText>
        <GradientText
          colors={[C.ink, C.lime, C.ink]}
          animationSpeed={7}
          className="scene-hl"
        >
          ПОСМІШКА.
        </GradientText>
        <GradientText
          colors={[C.ink, C.cyan, C.ink]}
          animationSpeed={9}
          className="scene-hl"
        >
          ТВОЇ ПРАВИЛА.
        </GradientText>
      </div>

      <p className={styles.sub}>
        Без нотацій. Без осуду. Просто якісна допомога — і справді хороша кава.
      </p>

      <a href="#contact" className={styles.cta}>
        Записатись безкоштовно →
      </a>

      <div className={styles.stats}>
        {STATS.map(([v, l]) => (
          <div key={l} className={styles.stat}>
            <div className={styles.statValue}>{v}</div>
            <div className={styles.statLabel}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
