type RabbitFaceProps = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
};

function RabbitFace({
  src = '/images/rabbit_face.png',
  alt = '토끼 얼굴',
  size = 48,
  className,
}: RabbitFaceProps) {
  return (
    <span className={className} aria-hidden={true}>
      <img src={src} alt={alt} width={size} height={size} />
    </span>
  );
}

export default RabbitFace;
