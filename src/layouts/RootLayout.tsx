import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function RootLayout() {
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
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}

export default RootLayout;
