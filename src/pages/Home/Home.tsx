import { Link } from 'react-router-dom';

import Icon from '@/components/Icon/Icon';

function Home() {
  return (
    <>
      <h1>홈</h1>
      <div className="flex flex-col">
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
        <Link to="/search">검색</Link>
        <Link to="/map">지도</Link>
        <Link to="/polzzak">폴짝</Link>
        <Link to="/my">마이페이지</Link>

        <Icon id="add" className="text-red-50" />
      </div>
    </>
  );
}

export default Home;
