import { useState, useEffect } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import GradientText from "../GradientText";
import { Ring } from "./Ring";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneTeam.module.css";

const IG_URL = "https://www.instagram.com/mad__dentist/";
const TIKTOK_URL = "https://www.tiktok.com/@mad__dentist";

const TEAM_LIST = [
  {
    name: "Д-р Чиркова",
    title: "Лікар-стоматолог · Косметична та реставраційна стоматологія",
    years: 14,
    yearsLabel: "РОКІВ ПРАКТИКИ",
    bio: "Я відкрила клініку з однією метою: щоб пацієнти почувались дійсно почутими — а не просто зубом у конвеєрі. Кожна усмішка — це унікальна історія.",
    accent: C.pink as string,
    ig: IG_URL,
    tiktok: TIKTOK_URL,
  },
  {
    name: "Д-р Мельник",
    title: "Ортодонт · Елайнери та брекет-системи",
    years: 9,
    yearsLabel: "РОКІВ ПРАКТИКИ",
    bio: "Спеціалізується на ортодонтичному лікуванні з використанням сучасних елайнерів та цифрового планування. Понад 800 завершених ортодонтичних випадків.",
    accent: C.purple as string,
    ig: IG_URL,
    tiktok: TIKTOK_URL,
  },
];

export function SceneTeam({ isMobile }: SceneProps) {
  const [team, setTeam] = useState(TEAM_LIST);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("team")
      .select("name, title, bio, years, years_label, sort_order")
      .eq("locale", "uk")
      .eq("active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (error) return;
        if (!data || data.length === 0) return;
        setTeam(
          data.map((m: any, i: number) => ({
            name: m.name,
            title: m.title,
            years: m.years,
            yearsLabel: m.years_label,
            bio: m.bio,
            accent: TEAM_LIST[i]?.accent ?? C.pink,
            ig: TEAM_LIST[i]?.ig ?? IG_URL,
            tiktok: TEAM_LIST[i]?.tiktok ?? TIKTOK_URL,
          })),
        );
      });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Ring x="70%" y="5%" size={300} color={C.purple} />
        <div className={styles.eyebrow}>НАША КОМАНДА</div>
        <div className={styles.heading}>
          <GradientText
            colors={[C.ink, C.purple, C.ink]}
            animationSpeed={5}
            className="scene-hl"
          >
            НЕ СТОМАТОЛОГ
          </GradientText>
          <GradientText
            colors={[C.purple, C.pink, C.purple]}
            animationSpeed={4}
            className="scene-hl"
          >
            ТВОЇХ БАТЬКІВ.
          </GradientText>
        </div>
      </div>

      <div className={styles.grid}>
        {team
          .filter((_, i) => !isMobile || i === 0)
          .map((m, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ ["--accent"]: m.accent } as React.CSSProperties}
            >
              <div className={styles.photo}>
                <div className={styles.photoName}>{m.name}</div>
                <div className={styles.badge}>
                  <div className={styles.badgeYears}>{m.years}</div>
                  <div className={styles.badgeLabel}>{m.yearsLabel}</div>
                </div>
              </div>

              <div>
                <div className={styles.name}>{m.name}</div>
                <div className={styles.role}>{m.title}</div>
              </div>

              <p className={styles.bio}>{m.bio}</p>

              <div className={styles.social}>
                <a
                  href={m.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.linkBase} ${styles.ig}`}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href={m.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.linkBase} ${styles.tiktok}`}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
