import { create } from 'zustand';

import supabase from '@/api/supabase';

interface Folder {
  folder_id: string;
  user_id: string;
  folder_name: string;
}

interface FavoritesStore {
  folders: Folder[];
  folderId: string | null;
  folderName: string;
  setSelectFolder: (folder: { id?: string; name?: string }) => void;
  getFolders: (
    userId: string,
    showToast: (msg: string, pos?: string) => void,
  ) => Promise<void>;
  addFolder: (
    userId: string,
    userPrimaryId: string,
    name: string,
    showToast: (msg: string, pos?: string) => void,
  ) => Promise<void>;
  editFolder: (
    name: string,
    showToast: (msg: string, pos?: string) => void,
  ) => void;
  deleteFolder: (showToast: (msg: string, pos?: string) => void) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  folders: [],
  folderId: null,
  folderName: '',

  setSelectFolder: ({ id, name }) =>
    set((state) => ({
      folderId: id ?? state.folderId,
      folderName: name ?? state.folderName,
    })),

  getFolders: async (userId) => {
    const { data, error } = await supabase
      .from('ex_favorite_folders')
      .select('folder_id,user_id, folder_name')
      .eq('user_id', userId);

    if (error) {
      console.log('❌ 즐겨찾기 리스트 가져오기 실패 : ', error);
      return;
    }

    set({ folders: data });
  },

  addFolder: async (userId, userPrimaryId, name, showToast) => {
    if (!userId) return;

    const folders = get().folders;
    const newId = newFolderId(userId, folders);

    const { error } = await supabase
      .from('ex_favorite_folders')
      .insert([
        { folder_id: newId, user_id: userPrimaryId, folder_name: name },
      ]);

    if (error) {
      console.log('❌ 폴더 추가 실패:', error);
      showToast('잠시 후 다시 시도해 주세요.', 'bottom-[64px]');
      return;
    }

    set({
      folders: [
        ...folders,
        { folder_id: newId, user_id: userPrimaryId, folder_name: name },
      ],
    });
  },

  editFolder: async (name, showToast) => {
    const folderId = get().folderId;
    const userId = get().folders.find((f) => f.folder_id === folderId)?.user_id;
    if (!folderId || !userId) return;

    const { error } = await supabase
      .from('ex_favorite_folders')
      .update({ folder_name: name })
      .eq('folder_id', folderId);

    if (error) {
      console.log('❌ 폴더명 수정 실패:', error);
      showToast('잠시 후 다시 시도해 주세요.', 'bottom-[64px]');
      return;
    }

    set((state) => ({
      folders: state.folders.map((f) =>
        f.folder_id === folderId ? { ...f, folder_name: name } : f,
      ),
      folderName: name,
    }));
  },

  deleteFolder: async (showToast) => {
    const folderId = get().folderId;
    if (!folderId) return;

    const { error } = await supabase
      .from('ex_favorite_folders')
      .delete()
      .eq('folder_id', folderId);

    if (error) {
      console.log('❌ 폴더 삭제 실패:', error);
      showToast('잠시 후 다시 시도해 주세요.', 'bottom-[64px]');
      return;
    }

    set((state) => {
      const deleted = state.folders.filter(
        (f) => f.folder_id !== state.folderId,
      );
      return { folders: deleted, folderId: null, folderName: '' };
    });
  },
}));

/* 폴더 id 생성 함수 */
function newFolderId(userId: string, folders: Folder[]): string {
  const userFolders = folders.filter((f) =>
    f.folder_id.startsWith(`${userId}_`),
  );

  const numArr = userFolders
    .map((f) => parseInt(f.folder_id.split('_')[1], 10))
    .filter((n) => !isNaN(n));

  const maxNum = numArr.length > 0 ? Math.max(...numArr) : -1;
  return `${userId}_${maxNum + 1}`;
}
