import { useState } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

type ToastProps = {
  text: string;
  close?: boolean;
  onClickClose?: () => void;
};

function Toast({ text, close, onClickClose }: ToastProps) {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    if (onClickClose) {
      onClickClose();
    }
    setShowToast(false);
  };

  if (!showToast) return null;

  return (
    <div className="fixed bottom-4 left-[50%] z-10 flex -translate-x-[50%] items-center gap-4 rounded-md bg-black/80 px-4 py-2">
      <p className="font-regular fs-14 whitespace-nowrap text-white">{text}</p>
      {close ? (
        <Button
          variant="tertiary"
          size="md"
          className="bg-transparent text-white"
          onClick={handleClose}
        >
          <Icon id="close" />
        </Button>
      ) : null}
    </div>
  );
}

export default Toast;
