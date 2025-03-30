import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label: string;
  srOnly?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
  id,
  label,
  srOnly = false,
  className,
  checked: propChecked = false,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = React.useState<boolean>(propChecked);

  const handleCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked);
    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={id}
        data-slot="checkbox"
        checked={checked}
        onCheckedChange={handleCheckedChange}
        aria-checked={checked ? 'true' : 'false'}
        aria-disabled={props.disabled ? 'true' : 'false'}
        className={cn(
          'peer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary aria-invalid:ring-destructive/20 aria-invalid:border-destructive border-gray03 focus-visible:border-ring focus-visible:ring-ring m-[4px] size-6 shrink-0 cursor-pointer rounded-[4px] border-2 shadow-xs transition-shadow outline-none focus-visible:ring-[2px] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-white transition-none"
        >
          <CheckIcon className="size-5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label
        htmlFor={id}
        className={cn(
          'fs-14 font-regular text-gray07 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          srOnly &&
            'clip-rect(0,0,0,0) absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-0 p-0 whitespace-nowrap',
        )}
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
