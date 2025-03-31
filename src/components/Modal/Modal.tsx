import Dimd from '@/components/Modal/Dimd';
import { useModalActions } from '@/hooks/useModalActions';
import { useModalStore } from '@/store/useModalStore';

import AlertModal from './AlertModal';
import SlideUpModal from './SlideUpModal';

interface ModalProps {
  mode: 'alert' | 'slide';
  type: string;
}

function Modal({ mode, type }: ModalProps) {
  const { isOpen } = useModalStore();
  const { handleButtonClick } = useModalActions();
  if (!isOpen) return null;

  return (
    <Dimd>
      {mode === 'alert' ? (
        <AlertModal type={type} handleButtonClick={handleButtonClick} />
      ) : (
        <SlideUpModal type={type} handleButtonClick={handleButtonClick} />
      )}
    </Dimd>
  );
}

export default Modal;
