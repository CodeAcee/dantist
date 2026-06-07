import { useState, useEffect } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import SpotlightCard from "../SpotlightCard";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneServices.module.css";

const SERVICES_LIST = [
  {
    num: "01",
    name: "Вініри",
    desc: "Кастомний фарфор. 2 тижні.",
    price: "від 8 000 грн",
    color: C.lime as string,
  },
  {
    num: "02",
    name: "Імпланти",
    desc: "Титанові корені. Назавжди.",
    price: "від 18 000 грн",
    color: C.cyan as string,
  },
  {
    num: "03",
    name: "Елайнери",
    desc: "Ніхто не помітить. Ти — відчуєш.",
    price: "від 25 000 грн",
    color: C.pink as string,
  },
  {
    num: "04",
    name: "Відбілювання",
    desc: "1 сеанс. 8 тонів яскравіше.",
    price: "від 3 500 грн",
    color: C.purple as string,
  },
  {
    num: "05",
    name: "Огляд",
    desc: "30 хв. Повний скан. Кава включена.",
    price: "БЕЗКОШТОВНО",
    color: C.lime as string,
  },
  {
    num: "06",
    name: "Терміново",
    desc: "Зламаний зуб? Того ж дня.",
    price: "Телефонуй",
    color: C.cyan as string,
  },
];

const PRICE_DETAILS = [
  {
    cat: "КОСМЕТИКА",
    items: [
      { name: "Порцеляновий вінір (1)", price: "від 8 000 грн" },
      { name: "Нарощення (1)", price: "від 2 500 грн" },
      { name: "Zoom-відбілювання", price: "4 500 грн" },
    ],
  },
  {
    cat: "ІМПЛАНТИ",
    items: [
      { name: "Імплант (під ключ)", price: "від 25 000 грн" },
      { name: "Коронка (кераміка)", price: "від 5 500 грн" },
      { name: "Синус-ліфтинг", price: "від 12 000 грн" },
    ],
  },
  {
    cat: "ОРТОДОНТІЯ",
    items: [
      { name: "Елайнери (повний курс)", price: "від 45 000 грн" },
      { name: "Металева брекет-система", price: "від 18 000 грн" },
      { name: "Ретейнери", price: "від 2 400 грн" },
    ],
  },
  {
    cat: "ВІДБІЛЮВАННЯ",
    items: [
      { name: "Zoom-відбілювання", price: "4 500 грн" },
      { name: "Домашнє відбілювання (каппи)", price: "від 2 800 грн" },
      { name: "Air Flow (профілактика)", price: "1 500 грн" },
    ],
  },
  {
    cat: "КОНСУЛЬТАЦІЯ",
    items: [
      { name: "Первинна консультація", price: "Безкоштовно" },
      { name: "Повторна консультація", price: "200 грн" },
      { name: "Цифровий рентген (повний)", price: "800 грн" },
    ],
  },
  {
    cat: "НЕВІДКЛАДНА ДОПОМОГА",
    items: [
      { name: "Огляд + план лікування", price: "Безкоштовно" },
      { name: "Видалення зуба", price: "від 1 200 грн" },
      { name: "Тимчасова пломба", price: "від 600 грн" },
    ],
  },
];

export function SceneServices(_: SceneProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [services, setServices] = useState(SERVICES_LIST);
  const [priceCategories, setPriceCategories] =
    useState<typeof PRICE_DETAILS>(PRICE_DETAILS);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("services")
      .select("name, description, starting_price, sort_order")
      .eq("locale", "uk")
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
            color: SERVICES_LIST[i]?.color ?? C.lime,
          })),
        );
      });
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("price_categories")
      .select("id, name, price_items(name, price, sort_order)")
      .eq("locale", "uk")
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
  }, []);

  const selected = selectedIdx !== null ? services[selectedIdx] : null;
  const detail =
    selectedIdx !== null ? (priceCategories[selectedIdx] ?? null) : null;

  return (
    <div className={styles.root}>
      <div>
        <Ring x="-10%" y="20%" size={160} color={C.cyan} />
        <div className={styles.title}>
          <GradientText
            colors={[C.cyan, C.blue, C.cyan]}
            animationSpeed={4}
            className="scene-hl"
          >
            ВИПРАВ.
          </GradientText>
          <GradientText
            colors={[C.ink, C.cyan, C.ink]}
            animationSpeed={7}
            className="scene-hl"
          >
            ВИРІВНЯЙ.
          </GradientText>
          <GradientText
            colors={[C.ink, C.blue, C.ink]}
            animationSpeed={9}
            className="scene-hl"
          >
            ЗАБЛИЩИ.
          </GradientText>
        </div>
        <p className={styles.sub}>
          Все що потрібно твоїй посмішці — в одному місці.
        </p>
        <p className={styles.hint}>Натисни на картку — дивись ціни</p>
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
                {selectedIdx === i ? "▲ згорнути" : "▼ ціни"}
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
              <button
                onClick={() => setSelectedIdx(null)}
                className={styles.closeBtn}
              >
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
            <div className={styles.panelFoot}>
              Точну вартість уточнює лікар на консультації — вона безкоштовна
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
