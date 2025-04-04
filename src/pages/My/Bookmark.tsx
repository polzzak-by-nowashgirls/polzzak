import { useSearchParams } from 'react-router-dom';

import BookmarkFolderList from '@/components/BookmarkFolder/BookmarkFolderList';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

function Bookmark() {
  // ✅ 새로 고침 시에도 유지하기 위해 searchParams 사용
  const [searchParams] = useSearchParams();

  const modeParam = searchParams.get('mode');
  const mode = modeParam === 'edit' ? 'edit' : 'list';

  const isOpen = useModalStore((state) => state.isOpen);
  const modalType = useModalStore((state) => state.modalType);
  const openModal = useModalStore((state) => state.openModal);

  const handleFolderAddClick = () => openModal('folder_add');
  const handleDelete = () => {
    console.log('❌ 삭제 ❌');
    openModal('folder_delete');
  };
  const handleModify = () => {
    console.log('⚠️ 편집 ⚠️');
    openModal('folder_edit');
  };

  return (
    <>
      <BookmarkFolderList
        mode={mode}
        openModal={handleFolderAddClick}
        funcDelete={handleDelete}
        funcModify={handleModify}
      />
      {isOpen && modalType === 'folder_add' && (
        <Modal mode="slide" type="folder_add" />
      )}
      {isOpen && modalType === 'folder_edit' && (
        <Modal mode="slide" type="folder_edit" />
      )}
      {isOpen && modalType === 'folder_delete' && (
        <Modal mode="slide" type="folder_delete" />
      )}
    </>
  );
}

export default Bookmark;
