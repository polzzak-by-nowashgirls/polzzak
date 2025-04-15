import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

interface DataProps {
  [key: string]: any;
}

interface MapModalProps {
  title: string;
  data: DataProps[];
}

export default function MapModal({ title, data }: MapModalProps) {
  console.log(data);

  const onClickModalClose = () => {
    console.log('닫기 버튼 클릭');
  };

  return (
    <motion.dialog
      initial={{ y: '20%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '20%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-0 left-1/2 z-10 flex max-h-[50%] w-screen -translate-x-1/2 transform flex-col gap-4 rounded-t-2xl bg-white px-6 py-6"
    >
      <header className="flex items-center justify-between">
        <h2 className="fs-18 font-semibold text-black">{title}</h2>
        <Button variant="tertiary" size="md" onClick={onClickModalClose}>
          <Icon id="close" />
        </Button>
      </header>
      <ul className="flex flex-1 flex-col overflow-auto">
        {data.map((item, index) => (
          <li key={index} className="border-gray03 border-b-[1px] text-black">
            <Link
              to={`/map/food/${item.contentid}`}
              className="flex gap-4 py-4"
            >
              <figure className="bg-primary/10 flex aspect-video flex-2/6 items-center">
                {item.firstimage ? (
                  <img
                    src={item.firstimage}
                    alt={item.title}
                    className="h-full w-full"
                  />
                ) : (
                  <img
                    src="/images/rabbit_face.png"
                    alt="이미지 준비 중입니다."
                    className="m-auto aspect-square h-12"
                  />
                )}
              </figure>
              <div className="flex-4/6">
                <h3 className="fs-16 md:fs-16 font-semibold">{item.title}</h3>
                <p className="fs-14 flex gap-1">
                  <span>{item.addr1}</span>
                  <span>{item.addr2}</span>
                </p>
                {item.tel && <p className="fs-13">{item.tel}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </motion.dialog>
  );
}
