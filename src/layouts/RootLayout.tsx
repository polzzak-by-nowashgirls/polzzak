import { Suspense, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/components/Header/Header';
import NavMenu from '@/components/NavMenu/NavMenu';
import { cn } from '@/lib/utils';

// ✅ 상수 분리
const HEADER_TITLES: Record<string, string> = {
  '/': '🐰폴짝🐰',
  '/login': '로그인',
  '/search': '검색',
  '/map': '지도',
  '/polzzak': '폴짝',
  '/polzzak/add': '폴짝 추가',
  '/my': 'MY',
  '/my/edit': '내 정보',
  '/my/edit/nickname': '닉네임 설정',
  '/my/edit/password': '비밀번호 설정',
  '/my/edit/phone-number': '휴대폰 번호 설정',
  '/my/edit/email': '이메일 설정',
};

const HIDDEN_NAV_PATHS = new Set([
  '/search',
  '/login',
  '/splash',
  '/polzzak/add',
]);

const HIDDEN_HEADER_PATHS = new Set(['/map', '/splash']);

function RootLayout() {
  const location = useLocation();
  const path = location.pathname;
  const isRegisterPath = path.startsWith('/register');
  const isContentsPath = path.startsWith('/contents');

  // ✅ useMemo 최적화 (path가 변경될 때만 연산 실행)
  const headerTitle = useMemo(() => {
    if (isRegisterPath) return '회원가입';
    if (isContentsPath) return '2025 보롬왓 튤립 축제'; // 데이터 받아와야 함.
    return HEADER_TITLES[path] || '🐰폴짝🐰';
  }, [path, isRegisterPath, isContentsPath]);

  const showHeader = useMemo(() => !HIDDEN_HEADER_PATHS.has(path), [path]);
  const showNav = useMemo(
    () => !(HIDDEN_NAV_PATHS.has(path) || isRegisterPath),
    [path, isRegisterPath],
  );

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
