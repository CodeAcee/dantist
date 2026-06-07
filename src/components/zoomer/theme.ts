export const C = {
  bg: "#0a0a0a",
  ink: "#f0f0f0",
  lime: "#c8ff00",
  cyan: "#00e5ff",
  pink: "#ff3d8b",
  purple: "#a855f7",
  green: "#00ff88",
  orange: "#ff8c00",
  blue: "#0066ff",
} as const;

export type AccentColor = (typeof C)[keyof typeof C];
