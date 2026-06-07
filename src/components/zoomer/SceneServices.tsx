import { useState, useEffect } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import SpotlightCard from "../SpotlightCard";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneServices.module.css";

const SERVICE_COLORS = [C.lime, C.cyan, C.pink, C.purple, C.lime, C.cyan];

type Service = { num: string; name: string; desc: string; price: string; color: string };
type PriceCategory = { cat: string; items: { name: string; price: string }[] };

export function SceneServices({ lang }: SceneProps) {
  const t = STRINGS[lang].services;
  const serviceFallback: Service[] = t.list.map((s, i) => ({
    ...s,
    color: SERVICE_COLORS[i % SERVICE_COLORS.length] as string,
  }));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>(serviceFallback);
  const [priceCategories, setPriceCategories] = useState<PriceCategory[]>(
    t.priceDetails as unknown as PriceCategory[],
  );

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("services")
      .select("name, description, starting_price, sort_order")
      .eq("locale", lang)
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) return;
        if (!data || data.length === 0) return;
        setServices(
          data.map((s: any, i: number) => ({
            num: String(i + 1).padStart(2, "0"),
            name: s.name,
            desc: s.description,
            price: s.starting_price,
            color: SERVICE_COLORS[i % SERVICE_COLORS.length] as string,
          })),
        );
      });
  }, [lang]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("price_categories")
      .select("id, name, price_items(name, price, sort_order)")
      .eq("locale", lang)
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) return;
        if (!data || data.length === 0) return;
        setPriceCategories(
          data.map((c: any) => ({
            cat: c.name.toUpperCase(),
            items: (c.price_items ?? [])
              .sort((a: any, b: any) => a.sort_order - b.sort_order)
              .map((item: any) => ({ name: item.name, price: item.price })),
          })),
        );
      });
  }, [lang]);

  const selected = selectedIdx !== null ? services[selectedIdx] : null;
  const detail =
    selectedIdx !== null ? (priceCategories[selectedIdx] ?? null) : null;

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
        {services.map((s, i) => (
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

      {selected && detail && (
        <div
          className={styles.panelOverlay}
          style={{ ["--accent"]: selected.color } as React.CSSProperties}
        >
          <div className={styles.scrim} onClick={() => setSelectedIdx(null)} />
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <div className={styles.panelEyebrow}>
                  {selected.num} / {selected.name}
                </div>
                <div className={styles.panelCat}>{detail.cat}</div>
              </div>
              <button onClick={() => setSelectedIdx(null)} className={styles.closeBtn}>
                ×
              </button>
            </div>
            <div className={styles.panelItems}>
              {detail.items.map((item, i) => (
                <div key={i} className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemDots} />
                  <span className={styles.itemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
            <div className={styles.panelFoot}>{t.panelFoot}</div>
          </div>
        </div>
      )}
    </div>
  );
}
