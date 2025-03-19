interface SvgIconProps {
  id: string;
  size?: number;
  className?: string;
}

const SvgIcon = ({ id, size = 24, className = '' }: SvgIconProps) => {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`/stack.svg#${id}`} />
    </svg>
  );
};

export default SvgIcon;
