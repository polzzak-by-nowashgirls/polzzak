import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

function NavMenu() {
  const navList = [
    ['/', '홈'],
    ['/search', '검색'],
    ['/map', '지도'],
    ['/polzzak', '폴짝'],
    ['/My', 'MY'],
  ];

  return (
    <nav
      className={cn(
        'relative flex h-15 w-full flex-1 items-center gap-2 bg-white px-4',
      )}
    >
      {navList.map(([to, label]) => (
        <NavLink
          to={to}
          key={to}
          className={({ isActive }) =>
            cn(
              'fs-16 text-gray07 flex h-full flex-1 items-center justify-center outline-none',
              'after:absolute after:top-0 after:block after:h-0.5 after:w-16 after:rounded-md after:content-[""]',
              'hover:text-primary hover:after:bg-primary',
              'active:text-primary-active active:after:bg-primary-active',
              !isActive && 'focus:text-primary focus:after:bg-primary',
              isActive && 'font-bold text-black after:bg-black',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavMenu;
