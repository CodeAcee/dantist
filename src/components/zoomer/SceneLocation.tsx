import type React from "react";
import GradientText from "../GradientText";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneLocation.module.css";

const CONTACT_META = [
  { icon: "☏", color: C.cyan as string, href: "tel:+380561234567" as string | null },
  { icon: "⊙", color: C.lime as string, href: null as string | null },
  { icon: "⏱", color: C.purple as string, href: null as string | null },
];

export function SceneLocation({ isMobile, lang }: SceneProps) {
  const t = STRINGS[lang].location;
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <GradientText colors={[C.cyan, C.green, C.cyan]} animationSpeed={4} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.ink, C.cyan, C.ink]} animationSpeed={6} className="scene-hl">
            {t.lines[1]}
          </GradientText>
          <GradientText colors={[C.green, C.lime, C.green]} animationSpeed={5} className="scene-hl">
            {t.lines[2]}
          </GradientText>
        </div>
        <p className={styles.sub}>{t.sub}</p>
        <div className={styles.contacts}>
          {t.contacts.map((d, i) => {
            const meta = CONTACT_META[i];
            return (
              <div key={d.label} className={styles.contactRow}>
                <div
                  className={styles.icon}
                  style={{ ["--ic"]: meta.color } as React.CSSProperties}
                >
                  {meta.icon}
                </div>
                <div>
                  <div className={styles.contactLabel}>{d.label}</div>
                  {meta.href ? (
                    <a href={meta.href} className={styles.contactLink}>
                      {d.val}
                    </a>
                  ) : (
                    <div className={styles.contactText}>{d.val}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.media}>
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10583.881065077816!2d35.03985051583366!3d48.45710003338652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe3206666c9dd%3A0x316566a1e70291e4!2sMykhaila%20Hrushevskoho%20St%2C%2029%2C%20Dnipro%2C%20Dnipropetrovs'ka%20oblast%2C%2049000!5e0!3m2!1sen!2sua!4v1780852088302!5m2!1sen!2sua"
            className={styles.mapFrame}
            loading="lazy"
            title="Chirkova Dentist on Google Maps"
          />
        </div>

        {!isMobile && (
          <div>
            <div className={styles.reviewsHead}>
              <div className={styles.reviewsTitle}>{t.reviewsTitle}</div>
              <div className={styles.rating}>
                <span className={styles.ratingNum}>4.9</span>
                <span className={styles.ratingStars}>★★★★★</span>
              </div>
            </div>
            <div className={styles.reviewsGrid}>
              {t.googleReviews.map((r) => (
                <div key={r.name} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <div className={styles.gLogo}>G</div>
                    <span className={styles.reviewName}>{r.name}</span>
                    <span className={styles.reviewAgo}>{r.ago}</span>
                  </div>
                  <div className={styles.reviewStars}>★★★★★</div>
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
