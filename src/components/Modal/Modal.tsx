import Dimd from '@/components/Modal/Dimd';
import { useModalStore } from '@/store/useModalStore';

import AlertModal from './AlertModal';
import SlideUpModal from './SlideUpModal';

interface ModalProps {
  mode: 'alert' | 'slide';
  type: string;
}

function Modal({ mode, type }: ModalProps) {
  const { isOpen } = useModalStore();
  if (!isOpen) return null;

  return (
    <Dimd>
      {mode === 'alert' ? (
        <AlertModal type={type} />
      ) : (
        <SlideUpModal type={type} />
      )}
    </Dimd>
  );
}

export default Modal;
