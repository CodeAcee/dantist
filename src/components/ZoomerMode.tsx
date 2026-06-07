import { useEffect, useRef, useState, useCallback } from "react";
import type React from "react";
import Aurora from "./backgrounds/Aurora";
import { SCENES } from "./zoomer/data";
import { C } from "./zoomer/theme";
import { STRINGS, type Lang } from "./zoomer/strings";
import { useIsMobile } from "./zoomer/useIsMobile";
import LangSwitcher from "./zoomer/LangSwitcher";
import { SceneHero } from "./zoomer/SceneHero";
import { SceneServices } from "./zoomer/SceneServices";
import { SceneBeforeAfter } from "./zoomer/SceneBeforeAfter";
import { SceneTeam } from "./zoomer/SceneTeam";
import { SceneReviews } from "./zoomer/SceneReviews";
import { SceneTikTok } from "./zoomer/SceneTikTok";
import { SceneClinic } from "./zoomer/SceneClinic";
import { SceneLocation } from "./zoomer/SceneLocation";
import { SceneContact } from "./zoomer/SceneContact";
import { RunningLine } from "./zoomer/RunningLine";
import "./zoomer/theme.css";
import styles from "./ZoomerMode.module.css";

const AURORA_PALETTES: string[][] = [
  [C.lime, C.cyan, "#0a1a0a"],
  [C.cyan, C.blue, "#001a1a"],
  [C.pink, C.orange, "#1a000a"],
  [C.purple, C.pink, "#0d000d"],
  [C.lime, C.purple, "#0a0a00"],
  [C.pink, C.cyan, "#1a0010"],
  [C.cyan, C.green, "#000d0d"],
  [C.lime, C.cyan, "#000d0d"],
];

export default function ZoomerMode({ lang = "uk" }: { lang?: Lang }) {
  const navLabels = STRINGS[lang].navLabels;
  const [visible, setVisible] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const worldRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTransitioning = useRef(false);
  const sceneIdxRef = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const id = "zoomer-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goToScene = useCallback((i: number) => {
    if (isTransitioning.current || i === sceneIdxRef.current) return;
    isTransitioning.current = true;
    sceneIdxRef.current = i;
    setSceneIdx(i);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 100);
  }, []);

  const navigateScene = useCallback(
    (delta: number) => {
      const next = Math.max(
        0,
        Math.min(SCENES.length - 1, sceneIdxRef.current + delta),
      );
      goToScene(next);
    },
    [goToScene],
  );

  useEffect(() => {
    const el = worldRef.current;
    if (!el) return;
    let active = false;
    let idleTimer = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        active = false;
      }, 50);
      if (active) return;
      active = true;
      navigateScene(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(idleTimer);
    };
  }, [navigateScene]);

  useEffect(() => {
    const el = worldRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 80) navigateScene(dy > 0 ? 1 : -1);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [navigateScene]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigateScene(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigateScene(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigateScene]);

  const totalProgress = SCENES.length > 1 ? sceneIdx / (SCENES.length - 1) : 0;
  const auroraColors = AURORA_PALETTES[sceneIdx] ?? AURORA_PALETTES[0];

  const sceneComponents = [
    <SceneHero isMobile={isMobile} lang={lang} />,
    <SceneServices isMobile={isMobile} lang={lang} />,
    <SceneBeforeAfter isMobile={isMobile} lang={lang} />,
    <SceneTeam isMobile={isMobile} lang={lang} />,
    <SceneReviews isMobile={isMobile} lang={lang} />,
    <SceneTikTok isMobile={isMobile} lang={lang} />,
    <SceneClinic isMobile={isMobile} lang={lang} />,
    <SceneLocation isMobile={isMobile} lang={lang} />,
    <SceneContact isMobile={isMobile} lang={lang} />,
  ];

  const sceneClass = (i: number) => {
    if (i === sceneIdx) return `${styles.scene} ${styles.sceneActive}`;
    if (i < sceneIdx) return `${styles.scene} ${styles.sceneBefore}`;
    return styles.scene;
  };

  return (
    <div className={`${styles.overlay} ${visible ? styles.visible : ""}`}>
      <div ref={worldRef} className={styles.world}>
        <div className={styles.viewport}>
          <div className={styles.aurora}>
            <Aurora
              colorStops={auroraColors}
              amplitude={0.9}
              blend={0.5}
              speed={0.6}
            />
          </div>

          <div className={styles.grid} />

          <div
            className={styles.progress}
            style={{ ["--progress"]: totalProgress } as React.CSSProperties}
          />

          <div className={styles.nav}>
            <div className={styles.brand}>
              CHIRKOVA<span className={styles.brandAccent}>.DENTIST</span>
            </div>
            <div className={styles.navRight}>
              {!isMobile && (
                <div className={styles.sceneLabel}>{navLabels[sceneIdx]}</div>
              )}
              <LangSwitcher isMobile={isMobile} lang={lang} />
            </div>
          </div>

          <div className={styles.indicator}>
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToScene(i)}
                className={
                  i === sceneIdx ? `${styles.dot} ${styles.dotActive}` : styles.dot
                }
                style={
                  {
                    ["--accent"]: s.accent,
                    ["--accent-glow"]: `${s.accent}60`,
                  } as React.CSSProperties
                }
                aria-label={navLabels[i]}
              />
            ))}
          </div>

          {SCENES.map((s, i) => (
            <div key={s.id} className={sceneClass(i)}>
              {sceneComponents[i]}
            </div>
          ))}

          {isMobile && (
            <div className={styles.mobileDots}>
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goToScene(i)}
                  className={
                    i === sceneIdx
                      ? `${styles.mobileDot} ${styles.mobileDotActive}`
                      : styles.mobileDot
                  }
                  style={{ ["--accent"]: s.accent } as React.CSSProperties}
                  aria-label={navLabels[i]}
                />
              ))}
            </div>
          )}

          <RunningLine lang={lang} />
        </div>
      </div>
    </div>
  );
}
