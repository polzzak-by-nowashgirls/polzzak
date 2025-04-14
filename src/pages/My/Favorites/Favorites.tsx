import FavoritesList from '@/components/Favorites/FavoritesList';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import RequireLogin from '@/pages/RequireLogin';
import { useModalStore } from '@/store/useModalStore';

function Favorites() {
  const { isOpen, modalType } = useModalStore();

  // 유저
  const isAuth = localStorage.getItem('user') || sessionStorage.getItem('user');
  const loader = false;

  return (
    <main className="p-6">
      {isAuth ? <FavoritesList /> : <RequireLogin />}
      {isOpen && modalType === 'folder_add' && (
        <Modal mode="slide" type="folder_add" />
      )}
      {isOpen && modalType === 'folder_edit' && (
        <Modal mode="slide" type="folder_edit" />
      )}
      {isOpen && modalType === 'folder_delete' && (
        <Modal mode="slide" type="folder_delete" />
      )}
      {loader && <Loader text="기다려주세요." />}
    </main>
  );
}

export default Favorites;
