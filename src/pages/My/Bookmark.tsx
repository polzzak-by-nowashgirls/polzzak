import BookmarkFolderList from '@/components/BookmarkFolder/BookmarkFolderList';
import Modal from '@/components/Modal/Modal';
import RequireLogin from '@/pages/RequireLogin';
import { useModalStore } from '@/store/useModalStore';

function Bookmark() {
  const { isOpen, modalType } = useModalStore();

  // 유저
  // const isAuth = localStorage.getItem('user')
  const isAuth = true;

  return (
    <main className="p-6">
      {isAuth ? <BookmarkFolderList /> : <RequireLogin />}
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
