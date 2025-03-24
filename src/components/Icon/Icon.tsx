interface IconProps {
  id: string;
  size?: number;
  className?: string;
}

function Icon({ id, size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`/stack.svg#${id}`} />
    </svg>
  );
}

export default Icon;
