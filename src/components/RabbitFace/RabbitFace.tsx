type RabbitFaceProps = {
  src: string;
  alt: string;
};

function RabbitFace({ src, alt }: RabbitFaceProps) {
  return (
    <span className="w-[48px]" aria-hidden={true}>
      <img src={src} alt={alt} className="h-full w-full" />
    </span>
  );
}

export default RabbitFace;
