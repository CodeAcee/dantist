import { useState } from "react";
import type React from "react";
import SpotlightCard from "../SpotlightCard";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import type { ServiceRow, PriceCategoryRow } from "../../lib/content";
import styles from "./SceneServices.module.css";

const SERVICE_COLORS = [C.lime, C.cyan, C.pink, C.purple, C.lime, C.cyan];

type Props = SceneProps & {
  services?: ServiceRow[];
  priceCategories?: PriceCategoryRow[];
};

export function SceneServices({ lang, services, priceCategories }: Props) {
  const t = STRINGS[lang].services;
  const list = services && services.length ? services : t.list;
  const serviceData = list.map((s, i) => ({
    ...s,
    color: SERVICE_COLORS[i % SERVICE_COLORS.length] as string,
  }));
  const priceData: PriceCategoryRow[] =
    priceCategories && priceCategories.length
      ? priceCategories
      : (t.priceDetails as unknown as PriceCategoryRow[]);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selected = selectedIdx !== null ? serviceData[selectedIdx] : null;
  // Match the price group to the service BY NAME (robust to ordering / count mismatch).
  const detail = selected
    ? (priceData.find(
        (p) => p.cat.trim().toUpperCase() === selected.name.trim().toUpperCase(),
      ) ?? null)
    : null;
  const items =
    detail?.items ??
    (selected
      ? [{ name: lang === "en" ? "Starting price" : "Вартість від", price: selected.price }]
      : []);

  return (
    <div className={styles.root}>
      <div>
        <Ring x="-10%" y="20%" size={160} color={C.cyan} />
        <div className={styles.title}>
          <GradientText colors={[C.cyan, C.blue, C.cyan]} animationSpeed={4} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.ink, C.cyan, C.ink]} animationSpeed={7} className="scene-hl">
            {t.lines[1]}
          </GradientText>
          <GradientText colors={[C.ink, C.blue, C.ink]} animationSpeed={9} className="scene-hl">
            {t.lines[2]}
          </GradientText>
        </div>
        <p className={styles.sub}>{t.sub}</p>
        <p className={styles.hint}>{t.hint}</p>
      </div>

      <div className={styles.cardsGrid}>
        {serviceData.map((s, i) => (
          <SpotlightCard
            key={s.num}
            spotlightColor={`${s.color}28`}
            onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
            className={
              selectedIdx === i ? `${styles.card} ${styles.cardSelected}` : styles.card
            }
            style={{ ["--accent"]: s.color } as React.CSSProperties}
          >
            <div className={styles.cardNum}>{s.num}</div>
            <div className={styles.cardName}>{s.name}</div>
            <div className={styles.cardDesc}>{s.desc}</div>
            <div className={styles.cardFoot}>
              <div className={styles.cardPrice}>{s.price}</div>
              <div className={styles.toggle}>
                {selectedIdx === i ? t.toggleOpen : t.toggleClosed}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {selected && (
        <div
          className={styles.panelOverlay}
          style={{ ["--accent"]: selected.color } as React.CSSProperties}
        >
          <div className={styles.scrim} onClick={() => setSelectedIdx(null)} />
          <div className={styles.panel}>
            <button
              onClick={() => setSelectedIdx(null)}
              className={styles.closeBtn}
              aria-label="Close"
            >
              ×
            </button>

            <div className={styles.panelEyebrow}>
              {lang === "en" ? "Price list" : "Прайс-лист"} · {selected.num}
            </div>
            <div className={styles.panelTitle}>{selected.name}</div>
            <p className={styles.panelDesc}>{selected.desc}</p>

            <div className={styles.panelItems}>
              {items.map((item, i) => (
                <div key={i} className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>{item.price}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setSelectedIdx(null)}
              className={`cd-btn cd-btn--block ${styles.panelCta}`}
            >
              {lang === "en" ? "Book a free consultation" : "Записатись безкоштовно"}
            </a>

            <div className={styles.panelFoot}>{t.panelFoot}</div>
          </div>
        </div>
      )}
    </div>
  );
}
