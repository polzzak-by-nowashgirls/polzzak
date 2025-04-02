import './style.css';

import { useEffect, useState } from 'react';

function LoadingSpinner({ text }: { text: string }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let count = 0;
    let interval: NodeJS.Timeout;

    const animate = () => {
      interval = setInterval(() => {
        count += 1;
        if (count <= 4) {
          setVisibleCount(count);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            count = 0;
            setVisibleCount(0);
            animate(); // 다시 시작
          }, 1000); // 다 보인 후 잠시 멈춤
        }
      }, 500);
    };

    animate();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed z-50 flex h-screen w-full flex-wrap items-center justify-center bg-black/50">
      <div className="flex h-[120px] w-[260px] flex-col items-center justify-center gap-5 rounded-lg bg-white">
        <div className="flex h-[33px] gap-4">
          {visibleCount >= 1 && <img src="/images/carrot.svg" alt="" />}
          {visibleCount >= 2 && <img src="/images/carrot.svg" alt="" />}
          {visibleCount >= 3 && <img src="/images/carrot.svg" alt="" />}
          {visibleCount >= 4 && <img src="/images/rabbit.svg" alt="" />}
        </div>
        <p className="fs-13 font-bold">{text}</p>
      </div>

      <div className="flex h-[120px] w-[260px] flex-col items-center justify-center gap-5 rounded-lg bg-white">
        <div className="loader"></div>
        <p className="fs-13 font-bold">{text}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
