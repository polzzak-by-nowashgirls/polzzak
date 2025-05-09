import RabbitFace from '@/components/RabbitFace/RabbitFace';

function Splash() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-[url('/images/pattern.png')] bg-center pb-12">
      <h1 className="fs-40 font-title text-primary border-ring flex aspect-square flex-col items-center gap-4 rounded-3xl border-4 bg-white p-5 font-semibold whitespace-nowrap shadow-lg">
        <RabbitFace src="/images/rabbit_face.png" alt="토끼 얼굴" />
        폴짝
      </h1>
    </div>
  );
}

export default Splash;
