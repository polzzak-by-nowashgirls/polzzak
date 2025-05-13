import { useCallback, useEffect, useRef, useState } from 'react';

import supabase from '@/api/supabase';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import FavoritesList, {
  FolderProps,
} from '@/components/Favorites/FavoritesList';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import { useToast } from '@/hooks/useToast';
import RequireLogin from '@/pages/RequireLogin';
import { useAuthStore } from '@/store/useAuthStore';
import { useDialogStore } from '@/store/useDialogStore';

const getFolders = async (userId: string, showToast: () => void) => {
  const { data, error } = await supabase
    .from('ex_favorite_folders')
    .select('id, folder_name')
    .eq('user_id', userId);

  if (error) {
    showToast();
    console.log(error);
    return;
  }

  return data;
};
const addFolder = async (
  userId: string,
  folderName: string,
  showToast: () => void,
) => {
  const { error } = await supabase
    .from('ex_favorite_folders')
    .insert([{ user_id: userId, folder_name: folderName }]);

  if (error) {
    console.log(error);
    showToast();
    return;
  }
};
const editFolder = async (
  folderId: string,
  folderName: string,
  showToast: () => void,
) => {
  const { error } = await supabase
    .from('ex_favorite_folders')
    .update({ folder_name: folderName })
    .eq('folder_id', folderId);

  if (error) {
    console.log(error);
    showToast();
    return;
  }
};
const deleteFolder = async (folderId: string, showToast: () => void) => {
  const { error } = await supabase
    .from('ex_favorite_folders')
    .delete()
    .eq('folder_id', folderId);

  if (error) {
    console.log(error);
    showToast();
    return;
  }
};

function Favorites() {
  const [folders, setFolders] = useState<FolderProps[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderProps>();
  const [dialogType, setDialogType] = useState<
    'add' | 'edit' | 'delete' | null
  >(null);
  const loader = false;
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, openModal, closeModal } = useDialogStore();
  const showToast = useToast();
  const failToast = useCallback(() => {
    showToast('잠시 후 다시 시도해 주세요.', 'bottom-[64px]', 2000);
  }, [showToast]);

  // 유저
  const { user, isAuthenticated } = useAuthStore();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      const data = await getFolders(userId, failToast);
      if (data) setFolders(data);
    };
    fetchData();
  }, [userId, failToast]);

  useEffect(() => {
    if (isOpen && (dialogType === 'add' || dialogType === 'edit')) {
      inputRef.current?.focus();
    }
  }, [isOpen, dialogType]);

  if (!isAuthenticated || !userId) {
    return <RequireLogin />;
  }

  const handleAddClick = () => {
    setCurrentFolder({ id: '', folder_name: '' });
    setDialogType('add');
    openModal();
  };
  const handleEditClick = (id: string, folder_name: string) => {
    setCurrentFolder({ id, folder_name });
    setDialogType('edit');
    openModal();
  };
  const handleDeleteClick = (id: string, folder_name: string) => {
    setCurrentFolder({ id, folder_name });
    setDialogType('delete');
    openModal();
  };

  const handleSaveFolder = async (type: 'add' | 'edit') => {
    if (!currentFolder?.folder_name.trim()) {
      inputRef.current?.focus();
      return;
    }

    if (type === 'add') {
      await addFolder(userId, currentFolder.folder_name.trim(), failToast);
    } else {
      await editFolder(
        currentFolder.id,
        currentFolder.folder_name.trim(),
        failToast,
      );
    }
    const data = await getFolders(userId, failToast);
    if (data) setFolders(data);
    closeModal();
    setDialogType(null);
  };

  const addBtn = [
    {
      text: '취소',
    },
    {
      text: '추가',
      onClick: () => {
        handleSaveFolder('add');
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
        handleSaveFolder('edit');
      },
    },
  ];
  const cancelBtn = [
    {
      text: '취소',
    },
    {
      text: '삭제',
      onClick: async () => {
        if (!currentFolder?.id) return;

        await deleteFolder(currentFolder.id, failToast);
        const data = await getFolders(userId, failToast);
        if (data) setFolders(data);
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
            value={currentFolder?.folder_name ?? ''}
            onChange={(e) =>
              setCurrentFolder((prev) =>
                prev
                  ? {
                      ...prev,
                      folder_name: e.target.value,
                    }
                  : undefined,
              )
            }
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
            value={currentFolder?.folder_name || ''}
            onChange={(e) =>
              setCurrentFolder((prev) =>
                prev
                  ? {
                      ...prev,
                      folder_name: e.target.value,
                    }
                  : undefined,
              )
            }
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
