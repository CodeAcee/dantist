import type React from "react";
import GradientText from "../GradientText";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneLocation.module.css";

const GOOGLE_REVIEWS = [
  {
    name: "Марія В.",
    stars: 5,
    text: "Найкраща клініка у Дніпрі! Вініри зробили за 2 тижні — результат вище очікувань.",
    ago: "2 тижні тому",
  },
  {
    name: "Дмитро К.",
    stars: 5,
    text: "Лікар уважний і не поспішає. Вперше не боявся йти до стоматолога!",
    ago: "1 місяць тому",
  },
  {
    name: "Ірина С.",
    stars: 5,
    text: "Зробили імплант — навіть забула де він. Дякую всій команді за увагу та підтримку!",
    ago: "2 місяці тому",
  },
];

const CONTACTS = [
  {
    icon: "☏",
    label: "Телефон",
    val: "+38 (056) 123-45-67",
    color: C.cyan as string,
    href: "tel:+380561234567" as string | null,
  },
  {
    icon: "⊙",
    label: "Адреса",
    val: "просп. Яворницького 22, Дніпро",
    color: C.lime as string,
    href: null as string | null,
  },
  {
    icon: "⏱",
    label: "Графік",
    val: "Пн–Пт 9:00–20:00 · Сб 10:00–18:00",
    color: C.purple as string,
    href: null as string | null,
  },
];

export function SceneLocation({ isMobile }: SceneProps) {
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <GradientText
            colors={[C.cyan, C.green, C.cyan]}
            animationSpeed={4}
            className="scene-hl"
          >
            ЗНАЙДИ.
          </GradientText>
          <GradientText
            colors={[C.ink, C.cyan, C.ink]}
            animationSpeed={6}
            className="scene-hl"
          >
            ПРИХОДЬ.
          </GradientText>
          <GradientText
            colors={[C.green, C.lime, C.green]}
            animationSpeed={5}
            className="scene-hl"
          >
            ВІДЧУЙ.
          </GradientText>
        </div>
        <p className={styles.sub}>
          Ми в центрі Дніпра. Поруч — метро, паркінг, кава після прийому.
        </p>
        <div className={styles.contacts}>
          {CONTACTS.map((d) => (
            <div key={d.label} className={styles.contactRow}>
              <div
                className={styles.icon}
                style={{ ["--ic"]: d.color } as React.CSSProperties}
              >
                {d.icon}
              </div>
              <div>
                <div className={styles.contactLabel}>{d.label}</div>
                {d.href ? (
                  <a href={d.href} className={styles.contactLink}>
                    {d.val}
                  </a>
                ) : (
                  <div className={styles.contactText}>{d.val}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.media}>
        <div className={styles.map}>
          <iframe
            src="https://maps.google.com/maps?q=просп.+Яворницького+22,+Дніпро,+Україна&output=embed&hl=uk&z=15"
            className={styles.mapFrame}
            loading="lazy"
            title="Chirkova Dentist on Google Maps"
          />
        </div>

        {!isMobile && (
          <div>
            <div className={styles.reviewsHead}>
              <div className={styles.reviewsTitle}>GOOGLE ВІДГУКИ</div>
              <div className={styles.rating}>
                <span className={styles.ratingNum}>4.9</span>
                <span className={styles.ratingStars}>★★★★★</span>
              </div>
            </div>
            <div className={styles.reviewsGrid}>
              {GOOGLE_REVIEWS.map((r) => (
                <div key={r.name} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <div className={styles.gLogo}>G</div>
                    <span className={styles.reviewName}>{r.name}</span>
                    <span className={styles.reviewAgo}>{r.ago}</span>
                  </div>
                  <div className={styles.reviewStars}>
                    {"★".repeat(r.stars)}
                  </div>
                  <div className={styles.reviewText}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
