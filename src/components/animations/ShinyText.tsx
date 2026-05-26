interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function ShinyText({ children, style = {} }: Props) {
  return (
    <span style={{
      background: 'linear-gradient(120deg, #2a3d2e 40%, #c8a96e 50%, #2a3d2e 60%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'shimmer 3s linear infinite',
      ...style,
    }}>{children}</span>
  );
}
