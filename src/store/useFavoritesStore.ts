import { create } from 'zustand';

import { Bookmark, BookmarkDummyData } from '@/mockData/ScheduleDummyData';
import { useModalStore } from '@/store/useModalStore';

interface FavoritesStore {
  folders: Bookmark[];
  folderId: number | null;
  setFolders: (folders: Bookmark[]) => void;
  selectFolder: (id: number | null) => void;
  addFolder: (id: number, name: string) => void;
  deleteFolder: () => void;
  modifyFolder: (name: string) => void;
  handleAddClick: () => void;
  handleDeleteClick: (id: number) => void;
  handleModifyClick: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  folders: BookmarkDummyData,
  folderId: null,

  setFolders: (folders) => set({ folders }),
  selectFolder: (id) => set({ folderId: id }),

  addFolder: (id, name) =>
    set((state) => {
      const newFolder = {
        id: id,
        name: name,
        storage: [],
      };

      return { folders: [...state.folders, newFolder] };
    }),

  deleteFolder: () =>
    set((state) => {
      const updated = state.folders.filter((f) => f.id !== state.folderId);
      console.log('🗑 삭제 후 folders:', updated);
      return { folders: updated };
    }),

  modifyFolder: (name) =>
    set((state) => {
      const folderId = state.folderId;
      if (folderId === null) return {};

      return {
        folders: state.folders.map((f) =>
          f.id === folderId ? { ...f, name } : f,
        ),
      };
    }),

  handleAddClick: () => {
    const { openModal } = useModalStore.getState();
    openModal('folder_add');
  },
  handleDeleteClick: (id) => {
    const { openModal } = useModalStore.getState();
    set({ folderId: id });
    openModal('folder_delete');
  },

  handleModifyClick: (id) => {
    const { openModal } = useModalStore.getState();
    set({ folderId: id });
    openModal('folder_edit');
  },
}));
