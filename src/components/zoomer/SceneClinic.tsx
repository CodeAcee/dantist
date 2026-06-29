import { useState } from "react";
import GradientText from "../GradientText";
import { C } from "./theme";
import { STRINGS } from "./strings";
import type { SceneProps } from "./types";
import type { ClinicMediaRow } from "../../lib/content";
import styles from "./SceneClinic.module.css";

type Props = SceneProps & { media?: ClinicMediaRow[] };

export function SceneClinic({ isMobile, lang, media }: Props) {
  const t = STRINGS[lang].clinic;
  const video = media?.find((m) => m.type === "video" && m.videoUrl);
  const images = (media ?? []).filter((m) => m.type === "image" && m.imageUrl);
  const hasPhotos = images.length > 0;

  const [videoOpen, setVideoOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState<number | null>(null);

  const closeCarousel = () => setCarouselIdx(null);
  const prevImage = () =>
    setCarouselIdx((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  const nextImage = () =>
    setCarouselIdx((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <GradientText colors={[C.purple, "#c084fc", C.purple]} animationSpeed={4} className="scene-hl">
            {t.lines[0]}
          </GradientText>
          <GradientText colors={[C.ink, C.purple, C.ink]} animationSpeed={6} className="scene-hl">
            {t.lines[1]}
          </GradientText>
          <GradientText colors={["#c084fc", C.lime, "#c084fc"]} animationSpeed={5} className="scene-hl">
            {t.lines[2]}
          </GradientText>
        </div>
        <p className={styles.sub}>{t.sub}</p>
        {!isMobile && (
          <div className={styles.stats}>
            {t.stats.map((s) => (
              <div key={s.num} className={styles.statRow}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.media}>
        <button
          type="button"
          className={styles.video}
          onClick={() => video && setVideoOpen(true)}
          disabled={!video}
        >
          {video ? (
            <>
              <video
                src={video.videoUrl}
                muted
                playsInline
                preload="metadata"
                className={styles.videoEl}
              />
              <div className={styles.videoOverlay}>
                <div className={styles.playIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5l11 7-11 7V5z" fill="#fff" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.videoPlaceholder}>
              <div className={styles.playIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5l11 7-11 7V5z" fill="rgba(168,85,247,0.6)" />
                </svg>
              </div>
              <span className={styles.videoLabel}>{t.videoLabel}</span>
            </div>
          )}
        </button>

        <div className={styles.photos}>
          {hasPhotos
            ? images.map((img, i) => (
                <button
                  key={img.imageUrl}
                  type="button"
                  className={styles.photo}
                  style={{ backgroundImage: `url(${img.imageUrl})` }}
                  onClick={() => setCarouselIdx(i)}
                >
                  {img.caption && (
                    <span className={styles.photoLabel}>{img.caption}</span>
                  )}
                </button>
              ))
            : t.photos.map((label) => (
                <div key={label} className={styles.photo}>
                  <span className={styles.photoLabel}>{label}</span>
                </div>
              ))}
        </div>
      </div>

      {videoOpen && video && (
        <div className={styles.overlay} onClick={() => setVideoOpen(false)}>
          <div
            className={styles.modalVideo}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setVideoOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <video
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              className={styles.modalVideoEl}
            />
          </div>
        </div>
      )}

      {carouselIdx !== null && images[carouselIdx] && (
        <div className={styles.overlay} onClick={closeCarousel}>
          <div
            className={styles.modalCarousel}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeCarousel}
              aria-label="Close"
            >
              ×
            </button>
            {images.length > 1 && (
              <button
                type="button"
                className={`${styles.navArrow} ${styles.navPrev}`}
                onClick={prevImage}
                aria-label="Previous"
              >
                ‹
              </button>
            )}
            <img
              src={images[carouselIdx].imageUrl}
              alt={images[carouselIdx].caption ?? ""}
              className={styles.modalImg}
            />
            {images.length > 1 && (
              <button
                type="button"
                className={`${styles.navArrow} ${styles.navNext}`}
                onClick={nextImage}
                aria-label="Next"
              >
                ›
              </button>
            )}
            {images[carouselIdx].caption && (
              <div className={styles.modalCaption}>
                {images[carouselIdx].caption}
              </div>
            )}
            {images.length > 1 && (
              <div className={styles.modalDots}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCarouselIdx(i)}
                    className={
                      i === carouselIdx
                        ? `${styles.modalDot} ${styles.modalDotActive}`
                        : styles.modalDot
                    }
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
