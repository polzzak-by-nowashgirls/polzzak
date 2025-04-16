import { create } from 'zustand';

import supabase from '@/api/supabase';

interface Folder {
  folder_id: string;
  folder_name: string;
}

interface FavoritesStore {
  folders: Folder[];
  folderId: string | null;
  folderName: string;
  getFolders: (userId: string) => Promise<void>;
  setSelectFolder: (folder: { id?: string; name?: string }) => void;
  addFolder: (userId: string, name: string) => Promise<void>;
  deleteFolder: () => void;
  editFolder: (name: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  folders: [],
  folderId: null,
  folderName: '',

  // DB연결
  getFolders: async (userId) => {
    const { data, error } = await supabase
      .from('ex_favorite_folders')
      .select('folder_id, folder_name')
      .eq('user_id', userId);

    if (error) {
      console.log('모달 띄우기! 데이터를 못 가져옴요 ㅅㄱ');
      return;
    }

    set({ folders: data });
  },

  setSelectFolder: ({ id, name }) => set({ folderId: id, folderName: name }),

  addFolder: async (userId, name) => {
    if (!userId) return;

    const folders = get().folders;
    const newId = newFolderId(userId, folders);

    const { error } = await supabase
      .from('ex_favorite_folders')
      .insert([{ folder_id: newId, folder_name: name }]);

    if (error) {
      console.log('❌ Supabase 폴더 추가 실패:, error');
      return;
    }

    set({ folders: [...folders, { folder_id: newId, folder_name: name }] });
  },

  deleteFolder: () =>
    set((state) => {
      const updated = state.folders.filter(
        (f) => f.folder_id !== state.folderId,
      );
      console.log('🗑 삭제 후 folders:', updated);
      return { folders: updated };
    }),

  editFolder: (name) =>
    set((state) => {
      const folderId = state.folderId;
      if (folderId === null) return {};
      return {
        folders: state.folders.map((f) =>
          f.folder_id === folderId ? { ...f, folder_name: name } : f,
        ),
        folderName: name,
      };
    }),
}));

// 폴더 id 생성 함수
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
