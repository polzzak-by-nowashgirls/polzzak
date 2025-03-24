import { Link } from 'react-router-dom';

import Icon from '@/components/Icon/Icon';

type Menu = {
  label: string;
  href: string;
};

type MenuItemProps = {
  menus: Menu[];
};

function MenuItem({ menus }: MenuItemProps) {
  return (
    <ul role="list">
      {menus.map((menu, index) => (
        <li key={index} role="listitem" className="rounded-sm px-1 py-0.5">
          <Link
            to={menu.href}
            aria-label={menu.label}
            className="font-regular fs-14 focus-visible:border-ring focus-visible:ring-ring flex items-center justify-between rounded-xs px-2 py-3 text-black outline-none focus-visible:ring-[2px] focus-visible:ring-offset-2"
          >
            {menu.label}
            <Icon id="arrow-large-right" className="text-gray05" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MenuItem;
