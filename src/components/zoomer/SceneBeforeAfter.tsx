import { useState, useEffect, useRef, useCallback } from "react";
import type React from "react";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import type { CaseRow } from "../../lib/content";
import styles from "./SceneBeforeAfter.module.css";

const ACCENTS = [C.lime, C.cyan, C.pink, C.purple];

type Case = CaseRow & { accent: string };

function ZSlider({ c }: { c: Case }) {
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
              <path d="M7 4L3 10L7 16" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L17 10L13 16" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

type Props = SceneProps & { cases?: CaseRow[] };

export function SceneBeforeAfter({ isMobile, lang, cases }: Props) {
  const t = STRINGS[lang].beforeAfter;
  const list = cases && cases.length ? cases : t.cases;
  const data: Case[] = list.map((c, i) => ({
    ...c,
    accent: ACCENTS[i % ACCENTS.length] as string,
  }));

  return (
    <div className={styles.root}>
      <div>
        <Ring x="-5%" y="60%" size={200} color={C.pink} />
        <div className={styles.title}>
          <GradientText colors={[C.pink, C.orange, C.pink]} animationSpeed={4} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.ink, C.pink, C.ink]} animationSpeed={7} className="scene-hl">
            {t.lines[1]}
          </GradientText>
          <GradientText colors={[C.orange, C.pink, C.orange]} animationSpeed={5} className="scene-hl">
            {t.lines[2]}
          </GradientText>
        </div>
        <p className={styles.sub}>{t.sub}</p>
        <div className={styles.hint}>
          {data.length} {t.casesHint}
        </div>
      </div>
      <div className={styles.cards}>
        {data
          .filter((_, i) => !isMobile || i < 2)
          .map((c, i) => (
            <ZSlider key={i} c={c} />
          ))}
      </div>
    </div>
  );
}
