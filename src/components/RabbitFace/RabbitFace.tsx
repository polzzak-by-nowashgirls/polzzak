type RabbitFaceProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

function RabbitFace({ src, alt, size = 48, className }: RabbitFaceProps) {
  return (
    <span className={`w-[${size}px] ${className}`} aria-hidden={true}>
      <img src={src} alt={alt} className="h-full w-full" />
    </span>
  );
}

export default RabbitFace;
