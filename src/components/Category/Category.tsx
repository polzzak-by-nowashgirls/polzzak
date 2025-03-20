import { Link } from 'react-router-dom';

function Category() {
  return (
    <nav role="menu">
      <ul className="bg-gray01 flex items-center justify-center gap-6 py-[0.75rem]">
        <li>
          <Link
            to={`/favorite`}
            className="group flex flex-col items-center justify-center gap-3"
          >
            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white">
              <img src="/images/favorite.png" alt="즐겨찾기 메뉴" />
            </div>
            <span className="text-14 font-Regular text-black group-hover:font-semibold">
              즐겨찾기
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={`/search/q=관광`}
            className="group flex flex-col items-center justify-center gap-3"
          >
            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white">
              <img src="/images/attraction.png" alt="관광 메뉴" />
            </div>
            <span className="text-14 font-Regular text-black group-hover:font-semibold">
              관광
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={`/search/q=축제`}
            className="group flex flex-col items-center justify-center gap-3"
          >
            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white">
              <img src="/images/festival.png" alt="축제 메뉴" />
            </div>
            <span className="text-14 font-Regular text-black group-hover:font-semibold">
              축제
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={`/search/q=맛집`}
            className="group flex flex-col items-center justify-center gap-3"
          >
            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white">
              <img src="/images/restaurant.png" alt="맛집 메뉴" />
            </div>
            <span className="text-14 font-Regular text-black group-hover:font-semibold">
              맛집
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Category;
