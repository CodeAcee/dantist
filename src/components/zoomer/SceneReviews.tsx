import type React from "react";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import type { ReviewRow } from "../../lib/content";
import styles from "./SceneReviews.module.css";

const COLORS = [C.lime, C.cyan, C.pink];

type Props = SceneProps & { reviews?: ReviewRow[] };

export function SceneReviews({ isMobile, lang, reviews }: Props) {
  const t = STRINGS[lang].reviews;
  const list = reviews && reviews.length ? reviews : t.list;
  const data = list.map((r, i) => ({
    ...r,
    color: COLORS[i % COLORS.length] as string,
  }));

  return (
    <div className={styles.root}>
      <Ring x="90%" y="15%" size={140} color={C.lime} />
      <div className={styles.header}>
        <div className={styles.title}>
          <GradientText colors={[C.ink, C.lime, C.ink]} animationSpeed={6} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.lime, C.purple, C.lime]} animationSpeed={4} className="scene-hl">
            {t.lines[1]}
          </GradientText>
        </div>
        <p className={styles.subtitle}>{t.sub}</p>
      </div>
      <div className={styles.grid}>
        {data
          .filter((_, i) => !isMobile || i < 2)
          .map((r) => (
            <div key={r.initials} className={styles.card}>
              <div className={styles.quote}>"{r.text}"</div>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ ["--avatar"]: r.color } as React.CSSProperties}
                >
                  {r.initials}
                </div>
                <div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.meta}>{r.age}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
