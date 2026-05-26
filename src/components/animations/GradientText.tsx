interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function GradientText({ children, style = {} }: Props) {
  return (
    <span style={{
      background: 'linear-gradient(135deg, #2a3d2e, #c8a96e, #3d5941)',
      backgroundSize: '300% 300%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradShift 4s ease infinite',
      ...style,
    }}>{children}</span>
  );
}
