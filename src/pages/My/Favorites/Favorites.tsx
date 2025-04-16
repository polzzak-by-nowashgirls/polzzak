import { useEffect, useState } from 'react';

import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import FavoritesList from '@/components/Favorites/FavoritesList';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import RequireLogin from '@/pages/RequireLogin';
import { useDialogStore } from '@/store/useDialogStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';

function Favorites() {
  const loader = false;
  const [dialogType, setDialogType] = useState<
    'add' | 'edit' | 'delete' | null
  >(null);

  const { isOpen, openModal, closeModal } = useDialogStore();
  const {
    folders,
    folderId,
    getFolders,
    folderName,
    setSelectFolder,
    addFolder,
  } = useFavoritesStore();

  // 유저
  const isAuth = localStorage.getItem('user') || sessionStorage.getItem('user');
  const isAuthId =
    localStorage.getItem('user_id') || sessionStorage.getItem('user_id');
  console.log(isAuth, isAuthId);

  useEffect(() => {
    if (!isAuthId) return;
    getFolders(isAuthId);
  }, [isAuthId]);

  // useEffect(() => {}, []);

  // add
  const handleAddClick = () => {
    setDialogType('add');
    openModal();
  };
  const addBtn = [
    {
      text: '취소',
    },
    {
      text: '추가',
      onClick: () => {
        if (!folderName.trim()) return;
        addFolder(isAuth, folderName);
        closeModal();
        setDialogType(null); // 상태 초기화
      },
    },
  ];

  // delete
  const handleDeleteClick = () => {
    setDialogType('delete');
    openModal();
  };

  // edit
  const handleEditClick = () => {
    setDialogType('edit');
    openModal();
  };

  const handleClose = () => {
    closeModal();
    setDialogType(null);
  };

  console.log(folders);

  return (
    <main className="p-6">
      {isAuth ? (
        <FavoritesList
          folders={folders}
          onClick={handleAddClick}
          onClickDelete={handleDeleteClick}
          onClickModify={handleEditClick}
        />
      ) : (
        <RequireLogin />
      )}
      {isOpen && dialogType === 'add' && (
        <SlideUpDialog header="폴더 추가" button={addBtn}>
          <Input
            label="폴더 추가"
            hideLabel={true}
            // value={folderName}
            onChange={(e) => setSelectFolder({ id: '4', name: e.target.value })}
            placeholder="폴더 이름을 입력해 주세요."
          />
        </SlideUpDialog>
      )}
      {isOpen && dialogType === 'edit' && (
        <SlideUpDialog header="폴더 이름 편집하기" button={addBtn}>
          <Input
            label="폴더명 편집"
            hideLabel={true}
            value={folderName}
            onChange={(e) => setSelectFolder({ name: e.target.value })}
            placeholder="폴더 이름을 입력해 주세요."
          />
        </SlideUpDialog>
      )}
      {isOpen && dialogType === 'delete' && (
        <SlideUpDialog header="폴더 삭제하기" button={addBtn}>
          <p className="fs-14 flex w-full justify-center text-center">
            폴더 내 모든 콘텐츠도 함께 삭제됩니다. <br />
            정말 삭제하시겠습니까?
          </p>
        </SlideUpDialog>
      )}

      {loader && <Loader text="기다려주세요." />}
    </main>
  );
}

export default Favorites;
