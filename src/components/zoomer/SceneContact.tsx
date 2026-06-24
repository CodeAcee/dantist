import { useState } from "react";
import type React from "react";
import GradientText from "../GradientText";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import styles from "./SceneContact.module.css";

const CONTACT_WORKER_URL = import.meta.env.PUBLIC_CONTACT_WORKER_URL as
  | string
  | undefined;

const NOTE_MAX = 1000;

const isValidUaPhone = (raw: string) => /^380\d{9}$/.test(raw.replace(/\D/g, ""));

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
  const [phoneTouched, setPhoneTouched] = useState(false);

  const set =
    (k: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const value =
        k === "note" ? e.target.value.slice(0, NOTE_MAX) : e.target.value;
      setForm((f) => ({ ...f, [k]: value }));
    };

  const phoneValid = isValidUaPhone(form.phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !phoneValid) {
      setPhoneTouched(true);
      return;
    }
    setStatus("loading");
    try {
      if (!CONTACT_WORKER_URL) {
        throw new Error("Contact worker URL is not configured");
      }
      const res = await fetch(CONTACT_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          service: form.service || undefined,
          contact_via: form.contact_via || undefined,
          note: form.note.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
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
                <div
                  className={
                    phoneTouched && !phoneValid
                      ? `${styles.input} ${styles.phoneWrap} ${styles.inputInvalid}`
                      : `${styles.input} ${styles.phoneWrap}`
                  }
                >
                  <span className={styles.phonePrefix}>+380</span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    placeholder="__ ___-__-__"
                    value={form.phone.replace(/^\+?380/, "")}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                      setForm((f) => ({ ...f, phone: digits ? `+380${digits}` : "" }));
                    }}
                    onBlur={() => setPhoneTouched(true)}
                    className={styles.phoneInput}
                  />
                </div>
                {phoneTouched && !phoneValid && (
                  <p className={styles.fieldError}>{t.phoneInvalid}</p>
                )}
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
                maxLength={NOTE_MAX}
                value={form.note}
                onChange={set("note")}
                className={`${styles.input} ${styles.textarea}`}
              />
              <p
                className={
                  form.note.length >= NOTE_MAX
                    ? `${styles.counter} ${styles.counterOver}`
                    : styles.counter
                }
              >
                {form.note.length}/{NOTE_MAX}
              </p>
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
