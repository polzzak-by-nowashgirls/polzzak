import { create } from 'zustand';

import { Bookmark, BookmarkDummyData } from '@/mockData/ScheduleDummyData';
import { useModalStore } from '@/store/useModalStore';

interface BookmarkStore {
  folders: Bookmark[];
  folderId: number | null;
  setFolders: (folders: Bookmark[]) => void;
  selectFolder: (id: number | null) => void;
  addFolder: (folder: Bookmark) => void;
  deleteFolder: (id: number) => void;
  modifyFolder: (updated: Bookmark) => void;

  handleAddClick: () => void;
  handleModifyClick: (id: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  folders: BookmarkDummyData,
  folderId: null,

  setFolders: (folders) => set({ folders }),
  selectFolder: (id) => set({ folderId: id }),

  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== id),
    })),

  modifyFolder: (updated) =>
    set((state) => ({
      folders: state.folders.map((f) => (f.id === updated.id ? updated : f)),
    })),

  handleAddClick: () => {
    const { openModal } = useModalStore.getState();
    openModal('folder_add');
  },

  handleModifyClick: (id) => {
    const { openModal } = useModalStore.getState();
    set({ folderId: id });
    openModal('folder_edit');
  },
}));
