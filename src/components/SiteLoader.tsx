import { useState, useEffect } from "react";
import CircularText from "./CircularText";

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), 2000);
    const unmountTimer = setTimeout(() => setMounted(false), 2800);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Subtle grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spinning text + center */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularText
          text="CHIRKOVA*DENTIST*STUDIO*"
          spinDuration={7}
          onHover="speedUp"
          className="loader-circle"
        />
        {/* Center content */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            style={{ fontSize: 26, color: "#c8ff00", lineHeight: 1, ...syne }}
          >
            ◆
          </div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginTop: 4,
              ...grotesk,
            }}
          >
            Chirkova Dentist
          </div>
        </div>
      </div>

      {/* Bottom brand line */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            ...syne,
          }}
        >
          Chirkova Dentist
        </div>
        <div
          style={{
            fontSize: 8,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            ...grotesk,
          }}
        >
          Дніпро · Косметична стоматологія
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #c8ff00, #00e5ff)",
            animation: "loader-progress 2s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes loader-progress {
          from { width: 0% }
          to   { width: 100% }
        }
        .loader-circle span {
          font-size: 11px !important;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.55) !important;
        }
        .loader-circle {
          width: 170px !important;
          height: 170px !important;
        }
      `}</style>
    </div>
  );
}
