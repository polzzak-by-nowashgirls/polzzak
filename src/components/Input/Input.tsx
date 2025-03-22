import * as React from 'react';

import { Label } from '@/components/Label';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  type: 'text' | 'password' | 'button' | 'file';
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

function Input({
  className,
  type,
  label,
  hideLabel,
  placeholder,
  children,
  ...props
}: InputProps) {
  const labelId = React.useId();
  const [fileName, setFileName] = React.useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
    props.onChange?.(e); // 파일 자체를 상위에 넘기기 위함
  };

  const inputClassName = cn(
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-full file:cursor-pointer file:border-0 file:bg-transparent file:pr-2 file:font-medium',
    'focus-visible:ring-ring/50 placeholder:text-gray05 focus-visible:ring-[2px] focus-visible:ring-offset-2',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'border-input text-14 m-0.5 flex h-10 w-full min-w-0 items-center rounded-md border bg-transparent px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none',
    (type === 'file' || type === 'button') && 'cursor-pointer py-0',
    children && 'pr-14',
    className,
  );

  const iconBtn = children && (
    <div className="absolute inset-y-0 right-0 flex items-center px-4">
      {children}
    </div>
  );

  return type === 'file' ? (
    <>
      <Label hideLabel={hideLabel} htmlFor={labelId}>
        {label}
      </Label>
      <div className={cn(children && 'relative')}>
        <label className={inputClassName}>
          <input
            type="file"
            data-slot="input"
            className="hidden"
            id={labelId}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.heic,.webp"
            {...props}
          />
          <span
            className={`${fileName ? 'text-black' : 'text-gray05'} flex-1 truncate text-left`}
          >
            {fileName || placeholder}
          </span>
        </label>
        {iconBtn}
      </div>
    </>
  ) : (
    <>
      <Label hideLabel={hideLabel} htmlFor={labelId}>
        {label}
      </Label>
      <div className={cn(children && 'relative')}>
        <input
          type={type}
          data-slot="input"
          className={`${inputClassName} ${type === 'button' && 'text-gray05 text-justify text-left'}`}
          id={labelId}
          placeholder={placeholder}
          {...props}
        />

        {iconBtn}
      </div>
    </>
  );
}

export default Input;
