import { useState } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/SortDropdown/DropdownMenu';

type DropdownProps = {
  label: string;
  options: string[];
};

function Dropdown({ options }: DropdownProps) {
  const [dropdownMenu, setDropdownMenu] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="md"
          className="border-gray03 h-9 rounded-full px-3 text-black"
        >
          {dropdownMenu}
          <Icon id={isOpen ? 'arrow_top' : 'arrow_bottom'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <DropdownMenuGroup>
          {options.map((menu, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => {
                setDropdownMenu(menu);
              }}
            >
              <span>{menu}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
