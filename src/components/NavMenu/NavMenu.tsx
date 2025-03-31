import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

function NavMenu({ className }: { className?: string }) {
  const navList = [
    ['/', '홈'],
    ['/search', '검색'],
    ['/map', '지도'],
    ['/polzzak', '폴짝'],
    ['/my', 'MY'],
  ];

  return (
    <nav
      className={cn(
        'border-gray02 order-1 flex h-15 w-full items-center gap-2 border-t-1 bg-white px-4 transition-transform duration-300 ease-in-out',
        className,
      )}
    >
      {navList.map(([to, label]) => (
        <NavLink
          to={to}
          key={to}
          className={({ isActive }) =>
            cn(
              'fs-16 text-gray07 flex h-full flex-1 items-center justify-center',
              'after:absolute after:top-0 after:block after:h-0.5 after:w-12 after:rounded-md after:content-[""]',
              'focus-visible:ring-ring outline-none hover:text-black focus-visible:rounded-lg focus-visible:text-black focus-visible:ring-[2px] focus-visible:ring-inset',
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
