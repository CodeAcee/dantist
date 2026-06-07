import { useState, useEffect } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneReviews.module.css";

const COLORS = [C.lime, C.cyan, C.pink];

type Review = {
  initials: string;
  name: string;
  age: string;
  color: string;
  text: string;
};

export function SceneReviews({ isMobile, lang }: SceneProps) {
  const t = STRINGS[lang].reviews;
  const fallback: Review[] = t.list.map((r, i) => ({
    ...r,
    color: COLORS[i % COLORS.length] as string,
  }));
  const [reviews, setReviews] = useState<Review[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("reviews")
      .select("quote, name, since, initials, color, sort_order")
      .eq("locale", lang)
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) return;
        if (!data || data.length === 0) return;
        setReviews(
          data.map((r: any, i: number) => ({
            initials: r.initials,
            name: r.name,
            age: r.since != null ? String(r.since) : "",
            color: r.color ?? COLORS[i % COLORS.length],
            text: r.quote,
          })),
        );
      });
  }, [lang]);

  const ageLabel = (age: string) =>
    /^\d+$/.test(age) ? `${age} ${t.yearsSuffix}` : age;

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
        {reviews
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
                  <div className={styles.meta}>{ageLabel(r.age)}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
