import { Suspense, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/components/Header/Header';
import NavMenu from '@/components/NavMenu/NavMenu';
import { cn } from '@/lib/utils';

function RootLayout() {
  const location = useLocation();
  const path = location.pathname;

  const headerTitles: Record<string, string> = {
    '/': '🐰폴짝🐰',
    '/search': '검색',
    '/map': '지도',
    '/polzzak': '폴짝',
    '/my': 'MY',
    '/my/edit': '내 정보',
    '/my/edit/nickname': '닉네임 설정',
    '/my/edit/password': '비밀번호 설정',
    '/my/edit/phone-number': '휴대폰 번호 설정',
    '/my/edit/email': '이메일 설정',
  };

  const defaultTitle = '🐰폴짝🐰';
  const headerTitle = headerTitles[path] || defaultTitle;

  const showHeader = !['/map'].includes(path);
  const showNav = !['/search'].includes(path);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = mainRef.current;
      if (!scrollElement) return;

      const currentScrollY = scrollElement.scrollTop;
      const maxScrollY =
        scrollElement.scrollHeight - scrollElement.clientHeight;

      // 스크롤이 하단에 도달했는지 체크
      if (currentScrollY === maxScrollY) {
        setIsHidden(false); // 최하단에 도달했을 때 isHidden을 false로 설정
      } else {
        if (currentScrollY > lastScrollY.current + 10) {
          setIsHidden(true); // 스크롤이 내려가면 숨김
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsHidden(false); // 스크롤이 위로 올라가면 보이게
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const scrollElement = mainRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>폴짝</title>
        <meta property="og:title" content="폴짝" />
        <meta property="twitter:title" content="폴짝" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta name="description" content="국내 여행지를 찾고 싶을 땐, 폴짝!" />
        <meta
          name="og:description"
          content="국내 여행지를 찾고 싶을 땐, 폴짝!"
        />
        <meta name="og:image" content="" />
        <meta name="og:site_name" content="국내 여행지를 찾고 싶을 땐, 폴짝!" />
        <meta name="og:site_author" content="nowashgirls" />
      </Helmet>
      {showHeader && <Header title={headerTitle} editHide={true} />}
      {showNav && (
        <NavMenu
          className={cn(
            isHidden
              ? 'pointer-events-none hidden translate-y-full'
              : 'flex translate-y-0',
          )}
        />
      )}

      <main
        ref={mainRef}
        className={cn(
          'flex-1 overflow-auto',
          path !== '/' && path !== 'map' && 'p-6',
        )}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default RootLayout;
