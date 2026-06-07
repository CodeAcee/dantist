import { useState, useEffect, useRef, useCallback } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneBeforeAfter.module.css";

const CASES_LIST = [
  {
    treatment: "8 вінірів",
    duration: "2 тижні",
    before: "Криві, потемнілі зуби",
    after: "Порцелянові вініри — природна білість",
    accent: C.lime as string,
  },
  {
    treatment: "Один імплант",
    duration: "3 місяці",
    before: "Відсутній передній зуб",
    after: "Імплант із керамічною коронкою",
    accent: C.cyan as string,
  },
  {
    treatment: "Zoom-відбіл",
    duration: "1 сеанс",
    before: "Жовте забарвлення",
    after: "Яскравий рівномірний відтінок",
    accent: C.pink as string,
  },
];

const CASE_ACCENTS = [C.lime, C.cyan, C.pink, C.purple];

function ZSlider({ c }: { c: (typeof CASES_LIST)[0] }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
    );
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      handleMove(
        "touches" in e
          ? (e as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX,
      );
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [handleMove]);

  return (
    <div
      className={styles.slider}
      style={
        { ["--accent"]: c.accent, ["--pos"]: `${pos}%` } as React.CSSProperties
      }
    >
      <div
        ref={ref}
        className={styles.frame}
        onMouseDown={(e) => {
          dragging.current = true;
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          handleMove(e.touches[0].clientX);
        }}
      >
        <div className={styles.before}>
          <div className={styles.beforeText}>Before</div>
        </div>
        <div className={styles.after}>
          <div className={styles.afterInner}>
            <div className={styles.afterText}>After</div>
          </div>
        </div>
        <div className={styles.divider}>
          <div className={styles.handle}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4L3 10L7 16"
                stroke="#0a0a0a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 4L17 10L13 16"
                stroke="#0a0a0a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className={styles.labelBefore}>BEFORE</div>
        <div className={styles.labelAfter}>AFTER</div>
      </div>
      <div className={styles.metaRow}>
        <span className={styles.metaTreat}>{c.treatment}</span>
        <span className={styles.metaDur}>{c.duration}</span>
      </div>
      <div className={styles.descRow}>
        <span className={styles.descBefore}>{c.before}</span>
        <span className={styles.descAfter}>{c.after}</span>
      </div>
    </div>
  );
}

export function SceneBeforeAfter({ isMobile }: SceneProps) {
  const [cases, setCases] = useState(CASES_LIST);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("cases")
      .select("before_label, after_label, treatment, duration, sort_order")
      .eq("locale", "uk")
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) return;
        if (!data || data.length === 0) return;
        setCases(
          data.map((c: any, i: number) => ({
            treatment: c.treatment,
            duration: c.duration,
            before: c.before_label,
            after: c.after_label,
            accent: CASE_ACCENTS[i % CASE_ACCENTS.length],
          })),
        );
      });
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <Ring x="-5%" y="60%" size={200} color={C.pink} />
        <div className={styles.title}>
          <GradientText
            colors={[C.pink, C.orange, C.pink]}
            animationSpeed={4}
            className="scene-hl"
          >
            ПЕРЕТЯГНИ.
          </GradientText>
          <GradientText
            colors={[C.ink, C.pink, C.ink]}
            animationSpeed={7}
            className="scene-hl"
          >
            ПОБАЧ.
          </GradientText>
          <GradientText
            colors={[C.orange, C.pink, C.orange]}
            animationSpeed={5}
            className="scene-hl"
          >
            ПОВІР.
          </GradientText>
        </div>
        <p className={styles.sub}>
          Реальні до/після. Реальні пацієнти. Кожен випадок — правда.
        </p>
        <div className={styles.hint}>
          {cases.length} кейси · перетягни повзунок
        </div>
      </div>
      <div className={styles.cards}>
        {cases
          .filter((_, i) => !isMobile || i < 2)
          .map((c, i) => (
            <ZSlider key={i} c={c} />
          ))}
      </div>
    </div>
  );
}
