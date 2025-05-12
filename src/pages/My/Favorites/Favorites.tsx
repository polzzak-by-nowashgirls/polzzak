import { useEffect, useRef, useState } from 'react';

import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import FavoritesList from '@/components/Favorites/FavoritesList';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import { useToast } from '@/hooks/useToast';
import RequireLogin from '@/pages/RequireLogin';
import { useDialogStore } from '@/store/useDialogStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';

function Favorites() {
  const loader = false;
  const inputRef = useRef<HTMLInputElement>(null);
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
    editFolder,
    deleteFolder,
  } = useFavoritesStore();
  const showToast = useToast();

  // 유저
  const isAuth = localStorage.getItem('user') || sessionStorage.getItem('user');
  const isAuthPrimaryId =
    localStorage.getItem('user_id') || sessionStorage.getItem('user_id');

  useEffect(() => {
    if (!isAuthPrimaryId) return;
    getFolders(isAuthPrimaryId, showToast);
  }, [isAuthPrimaryId, getFolders, showToast]);

  useEffect(() => {
    if (isOpen && (dialogType === 'add' || dialogType === 'edit')) {
      inputRef.current?.focus();
    }
  }, [isOpen, dialogType]);

  if (!isAuth || !isAuthPrimaryId) {
    return <RequireLogin />;
  }

  const handleAddClick = () => {
    setDialogType('add');
    openModal();
  };
  const handleEditClick = (id: string, name: string) => {
    setSelectFolder({ id, name });
    setDialogType('edit');
    openModal();
  };
  const handleDeleteClick = (id: string, name: string) => {
    setSelectFolder({ id, name });
    setDialogType('delete');
    openModal();
  };

  const addBtn = [
    {
      text: '취소',
    },
    {
      text: '추가',
      onClick: () => {
        if (!folderName.trim()) {
          inputRef.current?.focus();
          return;
        }
        addFolder(isAuth, isAuthPrimaryId, folderName.trim(), showToast);
        closeModal();
        setDialogType(null);
      },
    },
  ];
  const editBtn = [
    {
      text: '취소',
    },
    {
      text: '저장',
      onClick: () => {
        if (!folderName.trim()) {
          inputRef.current?.focus();
          return;
        }

        editFolder(folderName.trim(), showToast);
        closeModal();
        setDialogType(null);
      },
    },
  ];
  const cancelBtn = [
    {
      text: '취소',
    },
    {
      text: '삭제',
      onClick: () => {
        if (!folderId) return;

        deleteFolder(showToast);
        setDialogType(null);
      },
    },
  ];

  return (
    <section>
      <FavoritesList
        folders={folders}
        onClick={handleAddClick}
        onClickModify={handleEditClick}
        onClickDelete={handleDeleteClick}
      />
      {isOpen && dialogType === 'add' && (
        <SlideUpDialog header="폴더 추가" button={addBtn}>
          <Input
            label="폴더 추가"
            hideLabel={true}
            value={folderName ?? ''}
            onChange={(e) => setSelectFolder({ name: e.target.value })}
            placeholder="폴더 이름을 입력해 주세요."
            ref={inputRef}
          />
        </SlideUpDialog>
      )}
      {isOpen && dialogType === 'edit' && (
        <SlideUpDialog header="폴더 이름 편집하기" button={editBtn}>
          <Input
            label="폴더명 편집"
            hideLabel={true}
            value={folderName}
            onChange={(e) => setSelectFolder({ name: e.target.value })}
            placeholder="폴더 이름을 입력해 주세요."
            ref={inputRef}
          />
        </SlideUpDialog>
      )}
      {isOpen && dialogType === 'delete' && (
        <SlideUpDialog header="폴더 삭제하기" button={cancelBtn}>
          <p className="fs-14 flex w-full justify-center text-center">
            폴더 내 모든 콘텐츠도 함께 삭제됩니다.
            <br />
            정말 삭제하시겠습니까?
          </p>
        </SlideUpDialog>
      )}

      {loader && <Loader text="기다려주세요." />}
    </section>
  );
}

export default Favorites;
