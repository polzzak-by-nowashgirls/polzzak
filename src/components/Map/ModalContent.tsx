import { Link } from 'react-router-dom';

import { DetailCommonDataType } from '@/types/detailCommonDataType';

interface ModalContentProps {
  data: DetailCommonDataType[];
}

export default function ModalContent({ data }: ModalContentProps) {
  console.log(data);

  return (
    <ul className="flex flex-col">
      {data.map((item, index) => (
        <li key={index} className="border-gray03 border-b-[1px] text-black">
          <Link to={`/contents/${item.contentid}`} className="flex gap-4 py-4">
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
              <p className="fs-14 flex flex-wrap gap-x-1">
                <span>{item.addr1}</span>
                <span>{item.addr2}</span>
              </p>
              {item.tel && <p className="fs-13">{item.tel}</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
