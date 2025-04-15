import React from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { DialogProps, useModalStore } from '@/store/useModalStore';

function AlertDialog({
  dimd = true,
  header,
  description,
  button,
  buttonDirection = 'row',
}: DialogProps) {
  const { closeModal } = useModalStore();
  const Wrapper = dimd ? 'div' : React.Fragment;
  const btnLength = button?.length;

  return (
    <Wrapper
      {...(dimd
        ? {
            className:
              'fixed top-0 right-0 bottom-0 left-0 z-[99] h-screen w-screen bg-black/45',
          }
        : null)}
    >
      <dialog className="absolute top-1/2 left-1/2 flex w-full max-w-[17.3125rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-2xl bg-white p-6">
        <div className="m-auto flex flex-col text-center">
          <h3 className="fs-18 lh ls mb-4 font-semibold text-black">
            {header}
          </h3>
          {description?.map((content, idx) => (
            <p className="fs-14 ls lh font-regular text-gray07" key={idx}>
              <span>{content}</span>
            </p>
          ))}
        </div>
        <div
          className={`mt-6 flex w-full items-center justify-center gap-1 ${buttonDirection === 'row' ? 'flex-row' : 'flex-col'}`}
        >
          {button?.map((btn, idx) => (
            <Button
              className={`${buttonDirection === 'row' ? 'flex-1' : 'w-full'}`}
              {...(btnLength !== 1 && buttonDirection === 'row' && idx === 0
                ? {
                    onClick: () => {
                      if (btn.onClick) {
                        btn.onClick();
                      }
                      closeModal();
                    },
                  }
                : { onClick: btn.onClick })}
              key={idx}
              {...((btnLength !== 1 &&
                buttonDirection === 'row' &&
                idx === 0) ||
              (btnLength !== 1 && buttonDirection === 'col')
                ? { variant: 'secondary' }
                : null)}
            >
              {btn.text}
            </Button>
          ))}
        </div>
        <div className="order-first mb-1 flex flex-col items-end">
          <Button
            size="sm"
            variant={'tertiary'}
            aria-label="모달 닫기"
            onClick={closeModal}
          >
            <Icon id="close" />
          </Button>
        </div>
      </dialog>
    </Wrapper>
  );
}

export default AlertDialog;
