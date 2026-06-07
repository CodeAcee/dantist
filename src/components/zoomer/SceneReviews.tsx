import { useState, useEffect } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneReviews.module.css";

const REVIEWS_LIST = [
  {
    initials: "АК",
    name: "Аліна К.",
    age: 24 as number | string,
    color: C.lime as string,
    text: "Побилась з бомжами та вибив зуб падла безхатня, але Валерка завезла нового клика і все зробила за 2 години, тепер я не переймаюсь за посмішку і піду знову наебашу тому пуделю",
  },
  {
    initials: "МД",
    name: "Максим Д.",
    age: 27 as number | string,
    color: C.cyan as string,
    text: "Впала з БДСМ хреста та зламала зуб. Валерка все зробила швидко, без болю і нотацій.",
  },
  {
    initials: "ОС",
    name: "Олена С.",
    age: 22 as number | string,
    color: C.pink as string,
    text: "Наебнула щебня та замість гарного відпочинку в Карпатах отримала тріщину в зубі. Валерка окрім приниження мого колишнього ще й зробила все за 1 візит, тепер я можу їсти навіть горішки.",
  },
];

export function SceneReviews({ isMobile }: SceneProps) {
  const [reviews, setReviews] = useState(REVIEWS_LIST);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("reviews")
      .select("quote, name, since, initials, color, sort_order")
      .eq("locale", "uk")
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) return;
        if (!data || data.length === 0) return;
        setReviews(
          data.map((r: any) => ({
            initials: r.initials,
            name: r.name,
            age: `з ${r.since}`,
            color: r.color,
            text: r.quote,
          })),
        );
      });
  }, []);

  return (
    <div className={styles.root}>
      <Ring x="90%" y="15%" size={140} color={C.lime} />
      <div className={styles.header}>
        <div className={styles.title}>
          <GradientText
            colors={[C.ink, C.lime, C.ink]}
            animationSpeed={6}
            className="scene-hl"
          >
            ВОНИ СКАЗАЛИ.
          </GradientText>
          <GradientText
            colors={[C.lime, C.purple, C.lime]}
            animationSpeed={4}
            className="scene-hl"
          >
            НЕ МИ.
          </GradientText>
        </div>
        <p className={styles.subtitle}>Реальні слова. Без фільтрів.</p>
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
                  <div className={styles.meta}>
                    {typeof r.age === "number" ? `${r.age} років` : r.age}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
