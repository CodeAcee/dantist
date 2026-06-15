import type React from "react";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import type { TeamRow } from "../../lib/content";
import styles from "./SceneTeam.module.css";

const ACCENTS = [C.pink, C.purple];

type Props = SceneProps & { team?: TeamRow[] };

export function SceneTeam({ isMobile, lang, team }: Props) {
  const t = STRINGS[lang].team;
  const list: TeamRow[] =
    team && team.length ? team : (t.members as unknown as TeamRow[]);
  const data = list.map((m, i) => ({
    ...m,
    accent: ACCENTS[i % ACCENTS.length] as string,
  }));

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Ring x="70%" y="5%" size={300} color={C.purple} />
        <div className={styles.eyebrow}>{t.eyebrow}</div>
        <div className={styles.heading}>
          <GradientText colors={[C.ink, C.purple, C.ink]} animationSpeed={5} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.purple, C.pink, C.purple]} animationSpeed={4} className="scene-hl">
            {t.lines[1]}
          </GradientText>
        </div>
      </div>

      <div className={styles.grid}>
        {data
          .filter((_, i) => !isMobile || i === 0)
          .map((m, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ ["--accent"]: m.accent } as React.CSSProperties}
            >
              <div
                className={styles.photo}
                style={m.img ? { backgroundImage: `url(${m.img})` } : undefined}
              >
                {!m.img && <div className={styles.photoName}>{m.name}</div>}
                <div className={styles.badge}>
                  <div className={styles.badgeYears}>{m.years}</div>
                  <div className={styles.badgeLabel}>{m.yearsLabel}</div>
                </div>
              </div>

              <div>
                <div className={styles.name}>{m.name}</div>
                <div className={styles.role}>{m.title}</div>
              </div>

              <p className={styles.bio}>{m.bio}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
