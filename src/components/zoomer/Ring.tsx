import type React from "react";
import styles from "./Ring.module.css";

export function Ring({
  x,
  y,
  size,
  color,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
}) {
  return (
    <div
      className={styles.ring}
      style={
        {
          ["--x"]: x,
          ["--y"]: y,
          ["--size"]: `${size}px`,
          ["--ring-color"]: color,
        } as React.CSSProperties
      }
    />
  );
}
