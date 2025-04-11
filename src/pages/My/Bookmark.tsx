import BookmarkFolderList from '@/components/BookmarkFolder/BookmarkFolderList';
import Modal from '@/components/Modal/Modal';
import RequireLogin from '@/pages/RequireLogin';
import { useHeaderStore } from '@/store/useHeaderStore';
import { useModalStore } from '@/store/useModalStore';

function Bookmark() {
  const { isEditMode } = useHeaderStore();
  const isOpen = useModalStore((state) => state.isOpen);
  const modalType = useModalStore((state) => state.modalType);
  const openModal = useModalStore((state) => state.openModal);

  // 유저
  // const isAuth = localStorage.getItem('user')
  const isAuth = true;

  const handleAddClick = () => {
    console.log('➕ 폴더 추가 ➕');
    openModal('folder_add');
  };
  const handleDeleteClick = () => {
    console.log('❌ 폴더 삭제 ❌');
    openModal('folder_delete');
  };
  const handleModifyClick = () => {
    console.log('⚠️ 폴더 편집 ⚠️');
    openModal('folder_edit');
  };

  return (
    <main className="p-6">
      {isAuth ? (
        <BookmarkFolderList
          mode={isEditMode ? 'edit' : 'list'}
          onClickAdd={handleAddClick}
          onClickDelete={handleDeleteClick}
          onClickModify={handleModifyClick}
        />
      ) : (
        <RequireLogin />
      )}
      {isOpen && modalType === 'folder_add' && (
        <Modal mode="slide" type="folder_add" />
      )}
      {isOpen && modalType === 'folder_edit' && (
        <Modal mode="slide" type="folder_edit" />
      )}
      {isOpen && modalType === 'folder_delete' && (
        <Modal mode="slide" type="folder_delete" />
      )}
    </main>
  );
}

export default Bookmark;
