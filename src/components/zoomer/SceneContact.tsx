import { useState } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import GradientText from "../GradientText";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneContact.module.css";

export function SceneContact({ lang }: SceneProps) {
  const t = STRINGS[lang].contact;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    contact_via: "",
    note: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );

  const set =
    (k: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("loading");
    try {
      if (supabase) {
        await supabase.from("contact_requests").insert({
          name: form.name.trim(),
          phone: form.phone.trim(),
          service: form.service || null,
          contact_via: form.contact_via || null,
          note: form.note.trim() || null,
          source: "zoomer_form",
        });
      }
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };

  const selectClass = (value: string) =>
    value
      ? `${styles.input} ${styles.select}`
      : `${styles.input} ${styles.select} ${styles.placeholder}`;

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <GradientText colors={[C.lime, C.cyan, C.lime]} animationSpeed={4} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.ink, C.lime, C.ink]} animationSpeed={6} className="scene-hl">
            {t.lines[1]}
          </GradientText>
          <GradientText colors={[C.cyan, C.lime, C.cyan]} animationSpeed={5} className="scene-hl">
            {t.lines[2]}
          </GradientText>
        </div>
        <p className={styles.sub}>{t.sub}</p>
      </div>

      <div className={styles.formCol}>
        <div className={styles.eyebrow}>{t.eyebrow}</div>

        {status === "ok" ? (
          <div className={styles.success}>
            <div className={styles.successEmoji}>🦷</div>
            <div className={styles.successTitle}>{t.successTitle}</div>
            <div className={styles.successText}>{t.successText}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row2}>
              <div>
                <label className={styles.label}>{t.labels.name}</label>
                <input
                  required
                  type="text"
                  placeholder={t.placeholders.name}
                  value={form.name}
                  onChange={set("name")}
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>{t.labels.phone}</label>
                <input
                  required
                  type="tel"
                  placeholder={t.placeholders.phone}
                  value={form.phone}
                  onChange={set("phone")}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.rowResp}>
              <div>
                <label className={styles.label}>{t.labels.service}</label>
                <select
                  value={form.service}
                  onChange={set("service")}
                  className={selectClass(form.service)}
                >
                  <option value="">{t.placeholders.choose}</option>
                  {t.services.map((s) => (
                    <option key={s} value={s} className={styles.option}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={styles.label}>{t.labels.via}</label>
                <select
                  value={form.contact_via}
                  onChange={set("contact_via")}
                  className={selectClass(form.contact_via)}
                >
                  <option value="">{t.placeholders.choose}</option>
                  {t.vias.map((v) => (
                    <option key={v} value={v} className={styles.option}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={styles.label}>{t.labels.note}</label>
              <textarea
                placeholder={t.placeholders.note}
                rows={3}
                value={form.note}
                onChange={set("note")}
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="cd-btn cd-btn--block"
              style={{ ["--accent"]: C.cyan } as React.CSSProperties}
            >
              {status === "loading" ? t.submitting : t.submit}
            </button>

            {status === "err" && <p className={styles.error}>{t.error}</p>}

            <div className={styles.trust}>
              {t.trust.map((item) => (
                <div key={item} className={styles.trustItem}>
                  <span className={styles.trustDot} />
                  {item}
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
