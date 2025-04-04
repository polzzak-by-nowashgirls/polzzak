import { Suspense } from 'react';
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
    '/polzzak/add': '폴짝 추가',
    '/polzzak/edit': '폴짝 편집',
    '/my': 'MY',
    '/my/edit': '내 정보',
    '/my/edit/nickname': '닉네임 설정',
    '/my/edit/password': '비밀번호 설정',
    '/my/edit/phone-number': '휴대폰 번호 설정',
    '/my/edit/email': '이메일 설정',
  };
  const isRegisterPath = path.startsWith('/register');
  const isPolzzakEditPath = path.startsWith('/polzzak/edit');

  const defaultTitle = '🐰폴짝🐰';
  const getHeaderTitle = () => {
    if (isRegisterPath) {
      return '회원가입';
    }
    if (isPolzzakEditPath) return '폴짝 편집';
    return headerTitles[path] || defaultTitle;
  };
  const headerTitle = getHeaderTitle();

  // Header ❌
  const showHeader = !['/map', '/login', '/splash'].includes(path);

  // Nav ❌
  const isHiddenPathNav = [
    '/search',
    '/login',
    '/splash',
    '/polzzak/add',
    '/polzzak/edit',
  ].includes(path);
  const showNav = !(isHiddenPathNav || isRegisterPath || isPolzzakEditPath);

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
      {showNav && <NavMenu />}

      <main
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
