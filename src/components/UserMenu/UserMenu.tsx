import { Link } from 'react-router-dom';

import Icon, { IconId } from '@/components/Icon/Icon';

export interface MenuItemTypes {
  label: string;
  icon: IconId;
  path?: string;
  onClick?: () => void;
}

interface UserMenuProps {
  menus: MenuItemTypes[];
}

function UserMenu({ menus }: UserMenuProps) {
  return (
    <div className="m-auto flex max-w-md gap-4 px-1 py-0.5">
      {menus.map((item, index) =>
        item.onClick ? (
          <button
            key={index}
            onClick={item.onClick}
            className="fs-14 font-regular focus-visible:border-ring focus-visible:ring-ring flex flex-1 flex-col items-center gap-2 rounded-sm py-3 outline-none focus-visible:ring-[2px] focus-visible:ring-offset-2"
          >
            <Icon id={item.icon} />
            {item.label}
          </button>
        ) : (
          <Link
            to={item.path as string}
            key={index}
            className="fs-14 font-regular focus-visible:border-ring focus-visible:ring-ring flex flex-1 flex-col items-center gap-2 rounded-sm py-3 outline-none focus-visible:ring-[2px] focus-visible:ring-offset-2"
          >
            <Icon id={item.icon} />
            {item.label}
          </Link>
        ),
      )}
    </div>
  );
}

export default UserMenu;
