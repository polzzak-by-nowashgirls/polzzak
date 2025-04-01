type RabbitFaceProps = {
  src: string;
  alt: string;
};
const RabbitFace = ({ src, alt }: RabbitFaceProps) => (
  <span className="w-[48px]" aria-hidden={true}>
    <img src={src} alt={alt} className="h-full w-full" />
  </span>
);

function Splash() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 pb-12">
      <h1 className="fs-40 flex items-center gap-2 font-semibold whitespace-nowrap">
        <RabbitFace src="/images/rabbit_face.png" alt="토끼 얼굴" />
        폴짝
        <RabbitFace src="/images/rabbit_face.png" alt="토끼 얼굴" />
      </h1>
      <div>
        <img src="images/splash.png" alt="폴짝 시작하기" />
      </div>
    </div>
  );
}

export default Splash;
