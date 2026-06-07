import { useState } from "react";
import type React from "react";
import { supabase } from "../../lib/supabase";
import GradientText from "../GradientText";
import { C } from "./theme";
import type { SceneProps } from "./types";
import styles from "./SceneContact.module.css";

const SERVICES = [
  "Безкоштовна консультація",
  "Косметика / вініри",
  "Імпланти",
  "Відбілювання",
  "Елайнери",
  "Огляд",
  "Невідкладна",
];

const CONTACT_VIAS = ["Телефон", "Telegram", "Viber", "WhatsApp"];

const TRUST = [
  "Відповідь за 2 години",
  "Без спаму",
  "Перший візит безкоштовно",
];

export function SceneContact(_: SceneProps) {
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
          <GradientText
            colors={[C.lime, C.cyan, C.lime]}
            animationSpeed={4}
            className="scene-hl"
          >
            ДОСИТЬ
          </GradientText>
          <GradientText
            colors={[C.ink, C.lime, C.ink]}
            animationSpeed={6}
            className="scene-hl"
          >
            ДУМАТИ.
          </GradientText>
          <GradientText
            colors={[C.cyan, C.lime, C.cyan]}
            animationSpeed={5}
            className="scene-hl"
          >
            ПОЧИНАЙ.
          </GradientText>
        </div>
        <p className={styles.sub}>
          Перша консультація — безкоштовно. Відповідь за 2 години.
        </p>
      </div>

      <div className={styles.formCol}>
        <div className={styles.eyebrow}>ШВИДКИЙ ЗАПИТ</div>

        {status === "ok" ? (
          <div className={styles.success}>
            <div className={styles.successEmoji}>🦷</div>
            <div className={styles.successTitle}>Готово!</div>
            <div className={styles.successText}>
              Зателефонуємо протягом 2 годин.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row2}>
              <div>
                <label className={styles.label}>Ваше ім'я</label>
                <input
                  required
                  type="text"
                  placeholder="Катерина"
                  value={form.name}
                  onChange={set("name")}
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.label}>Телефон *</label>
                <input
                  required
                  type="tel"
                  placeholder="+38 (0__) ___-__-__"
                  value={form.phone}
                  onChange={set("phone")}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.rowResp}>
              <div>
                <label className={styles.label}>Послуга</label>
                <select
                  value={form.service}
                  onChange={set("service")}
                  className={selectClass(form.service)}
                >
                  <option value="">Оберіть...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className={styles.option}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={styles.label}>Зручний зв'язок</label>
                <select
                  value={form.contact_via}
                  onChange={set("contact_via")}
                  className={selectClass(form.contact_via)}
                >
                  <option value="">Оберіть...</option>
                  {CONTACT_VIAS.map((v) => (
                    <option key={v} value={v} className={styles.option}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={styles.label}>Примітка (за бажанням)</label>
              <textarea
                placeholder="Напр. — зручніше вранці, трохи хвилююсь..."
                rows={3}
                value={form.note}
                onChange={set("note")}
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={styles.submit}
            >
              {status === "loading" ? "Надсилається..." : "Надіслати запит →"}
            </button>

            {status === "err" && (
              <p className={styles.error}>
                Щось пішло не так. Зателефонуйте напряму.
              </p>
            )}

            <div className={styles.trust}>
              {TRUST.map((t) => (
                <div key={t} className={styles.trustItem}>
                  <span className={styles.trustDot} />
                  {t}
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
