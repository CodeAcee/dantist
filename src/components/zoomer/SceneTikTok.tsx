import { useState } from "react";
import type React from "react";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneTikTok.module.css";

const TIKTOK_HANDLE = "@mad__dentist";
const TIKTOK_URL = "https://www.tiktok.com/@mad__dentist";
const IG_URL = "https://www.instagram.com/mad__dentist/";

const TT_PATH =
  "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z";
const IG_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";

const icon = (path: string, size = 14, fill = "currentColor") => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d={path} />
  </svg>
);

export function SceneTikTok({ isMobile, lang }: SceneProps) {
  const t = STRINGS[lang].tiktok;
  const [slide, setSlide] = useState(0);

  const tabs = [
    { label: t.tt.brand, path: TT_PATH, color: C.pink as string },
    { label: t.ig.brand, path: IG_PATH, color: "#e1306c" },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setSlide(i)}
            className={slide === i ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            style={{ ["--tab"]: tab.color } as React.CSSProperties}
          >
            {icon(tab.path)}
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} style={{ ["--slide"]: slide } as React.CSSProperties}>
          <div className={styles.slide}>
            <div>
              <Ring x="-8%" y="20%" size={160} color={C.pink} />
              <Ring x="95%" y="70%" size={100} color={C.cyan} />
              <div className={styles.brandRow}>
                {icon(TT_PATH, 22, C.pink)}
                <span className={styles.brandLabel}>{t.tt.brand}</span>
              </div>
              <div className={styles.title}>
                <GradientText colors={[C.pink, "#ff69b4", C.pink]} animationSpeed={3} className="scene-hl">
                  {t.tt.lines[0]}
                </GradientText>
                <GradientText colors={[C.ink, C.pink, C.ink]} animationSpeed={6} className="scene-hl">
                  {t.tt.lines[1]}
                </GradientText>
                <GradientText colors={[C.ink, C.cyan, C.ink]} animationSpeed={8} className="scene-hl">
                  {t.tt.lines[2]}
                </GradientText>
              </div>
              <p className={styles.sub}>{t.tt.sub}</p>
              <div className={`${styles.stats} ${styles.statsTt}`}>
                {t.tt.stats.map(([v, l]) => (
                  <div key={l}>
                    <div className={styles.statNum}>{v}</div>
                    <div className={styles.statLabel}>{l}</div>
                  </div>
                ))}
              </div>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`cd-btn ${styles.cdBtnSpacer}`}
                style={{ ["--accent"]: C.pink } as React.CSSProperties}
              >
                {icon(TT_PATH, 11)}
                {TIKTOK_HANDLE} →
              </a>
            </div>
            <div className={styles.embeds}>
              {t.tt.videos
                .filter((_, i) => !isMobile || i === 0)
                .map((v, i) => (
                  <div
                    key={v.id}
                    className={i === 1 ? `${styles.embedCol} ${styles.embedColSecondary}` : styles.embedCol}
                  >
                    <div className={`${styles.frameTt} ${i === 0 ? styles.frameTtA : styles.frameTtB}`}>
                      <iframe
                        src={`https://www.tiktok.com/embed/v2/${v.id}`}
                        title={v.caption}
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.frameTtIframe}
                      />
                    </div>
                    <div className={styles.caption}>{v.caption}</div>
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.slide}>
            <div>
              <div className={styles.brandRow}>
                <div className={styles.igBadge}>{icon(IG_PATH, 13, "#fff")}</div>
                <span className={styles.brandLabel}>{t.ig.brand}</span>
              </div>
              <div className={`${styles.title} ${styles.titleIg}`}>
                <GradientText colors={["#f09433", "#dc2743", "#bc1888", "#f09433"]} animationSpeed={3} className="scene-hl">
                  {t.ig.lines[0]}
                </GradientText>
                <GradientText colors={[C.ink, "#dc2743", C.ink]} animationSpeed={6} className="scene-hl">
                  {t.ig.lines[1]}
                </GradientText>
                <GradientText colors={[C.ink, "#bc1888", C.ink]} animationSpeed={8} className="scene-hl">
                  {t.ig.lines[2]}
                </GradientText>
              </div>
              <p className={styles.sub}>{t.ig.sub}</p>
              <div className={`${styles.stats} ${styles.statsIg}`}>
                {t.ig.stats.map(([v, l]) => (
                  <div key={l}>
                    <div className={styles.statNumIg}>{v}</div>
                    <div className={styles.statLabel}>{l}</div>
                  </div>
                ))}
              </div>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`cd-btn cd-btn--ig ${styles.cdBtnSpacer}`}
              >
                {icon(IG_PATH, 11)}
                {TIKTOK_HANDLE} →
              </a>
            </div>
            <div className={styles.embeds}>
              {t.ig.posts
                .filter((_, i) => !isMobile || i === 0)
                .map((p, i) => (
                  <div
                    key={p.id}
                    className={i === 1 ? `${styles.embedCol} ${styles.embedColSecondary}` : styles.embedCol}
                  >
                    <div className={`${styles.frameIg} ${i === 0 ? styles.frameIgA : styles.frameIgB}`}>
                      <iframe
                        src={`https://www.instagram.com/reel/${p.id}/embed/`}
                        className={styles.frameIgIframe}
                        loading="lazy"
                        title={p.caption}
                        allowFullScreen
                      />
                    </div>
                    <div className={styles.caption}>{p.caption}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
