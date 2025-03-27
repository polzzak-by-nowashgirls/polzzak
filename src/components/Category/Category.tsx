import { Link } from 'react-router-dom';

const CATEGORY_LIST = [
  {
    id: 0,
    name: '즐겨찾기',
    linkURL: 'favorite',
    imageURL: '/images/favorite.png',
  },
  {
    id: 1,
    name: '관광',
    linkURL: `search/q=관광`,
    imageURL: '/images/attraction.png',
  },
  {
    id: 2,
    name: '축제',
    linkURL: `search/q=축제`,
    imageURL: '/images/festival.png',
  },
  {
    id: 3,
    name: '맛집',
    linkURL: `search/q=맛집`,
    imageURL: '/images/restaurant.png',
  },
];

function Category() {
  return (
    <nav role="menu" aria-label="카테고리 메뉴">
      <ul
        className="bg-gray01 flex items-center justify-center gap-6 py-3"
        role="menubar"
      >
        {CATEGORY_LIST.map((item) => (
          <li key={item.id}>
            <Link
              to={item.linkURL}
              className="group flex flex-col items-center justify-center gap-3"
              aria-label={`${item.name} 페이지로 이동`}
            >
              <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white">
                <img
                  src={item.imageURL}
                  alt={`${item.name} 카테고리 아이콘`}
                  className="h-6 w-6"
                  aria-label="hidden"
                />
              </div>
              <span className="fs-14 font-regular ls lh text-black group-hover:font-semibold group-focus:font-semibold">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Category;
