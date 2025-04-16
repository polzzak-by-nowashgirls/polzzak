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
  getFolders: (userId: string) => Promise<void>;
  setSelectFolder: (folder: { id?: string; name?: string }) => void;
  addFolder: (
    userId: string,
    userPrimaryId: string,
    name: string,
  ) => Promise<void>;
  editFolder: (name: string) => void;
  deleteFolder: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  folders: [],
  folderId: null,
  folderName: '',

  // DB연결
  getFolders: async (userId) => {
    const { data, error } = await supabase
      .from('ex_favorite_folders')
      .select('folder_id,user_id, folder_name')
      .eq('user_id', userId);

    if (error) {
      console.log('모달 띄우기! 데이터를 못 가져옴요 ㅅㄱ');
      return;
    }

    set({ folders: data });
  },

  setSelectFolder: ({ id, name }) =>
    set((state) => ({
      folderId: id ?? state.folderId,
      folderName: name ?? state.folderName,
    })),

  addFolder: async (userId, userPrimaryId, name) => {
    if (!userId) return;

    const folders = get().folders;
    const newId = newFolderId(userId, folders);

    const { error } = await supabase
      .from('ex_favorite_folders')
      .insert([
        { folder_id: newId, user_id: userPrimaryId, folder_name: name },
      ]);

    if (error) {
      console.log('❌ Supabase 폴더 추가 실패:', error);
      return;
    }

    set({
      folders: [
        ...folders,
        { folder_id: newId, user_id: userPrimaryId, folder_name: name },
      ],
    });
  },

  editFolder: async (name) => {
    console.log('문제 1 : ', name);

    const folderId = get().folderId;
    console.log('문제 2 : ', folderId);
    const userId = get().folders.find((f) => f.folder_id === folderId)?.user_id;
    console.log('문제 3 : ', userId);

    if (!folderId || !userId) return;

    console.log('✏️ Supabase 수정 요청:', folderId, name);

    const { error } = await supabase
      .from('ex_favorite_folders')
      .update({ folder_name: name })
      .eq('folder_id', folderId);

    if (error) {
      console.log('❌ Supabase 폴더명 수정 실패:', error);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('ex_favorite_folders')
      .select('folder_id, user_id, folder_name')
      .eq('user_id', userId);

    if (fetchError) {
      console.log('❌ 수정 후 목록 다시 불러오기 실패:', fetchError);
      return;
    }

    set({ folders: data, folderName: name });
  },

  deleteFolder: () =>
    set((state) => {
      const updated = state.folders.filter(
        (f) => f.folder_id !== state.folderId,
      );
      console.log('🗑 삭제 후 folders:', updated);
      return { folders: updated };
    }),
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
