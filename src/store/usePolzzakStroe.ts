import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

interface PolzzakStore {
  polzzakId: string | null;
  name: string | null;
  dateRange: DateRange | null;
  region: string[] | null;
  thumbnail: string | null;
  fileName: string | null;
  imageUrl: string | null;
  thumbnailBlob: Blob | null;

  setPolzzakId: (polzzakId: string | null) => void;
  setName: (name: string | null) => void;
  setDateRange: (date: DateRange | undefined) => void;
  setRegion: (regionUpdate: (prev: string[] | null) => string[]) => void;
  setThumbnail: (thumbnail: string | null) => void;
  setFileName: (fileName: string | null) => void;
  setImageUrl: (imageUrl: string | null) => void;
  setThumbnailBlob: (thumbnailBlob: Blob) => void;
  reset: () => void;
}

export const usePolzzakStore = create<PolzzakStore>()((set) => ({
  polzzakId: null,
  name: null,
  dateRange: null,
  region: null,
  thumbnail: null,
  fileName: null,
  imageUrl: null,
  thumbnailBlob: null,

  setPolzzakId: (polzzakId) => set({ polzzakId }),
  setName: (name) => set({ name }),
  setDateRange: (date) => set({ dateRange: date ?? null }),
  setRegion: (regionUpdate) =>
    set((state) => ({ region: regionUpdate(state.region) })),
  setThumbnail: (thumbnail) => set({ thumbnail }),
  setFileName: (fileName) => set({ fileName }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setThumbnailBlob: (thumbnailBlob) => set({ thumbnailBlob }),
  reset: () =>
    set({
      polzzakId: null,
      name: null,
      dateRange: null,
      region: null,
      thumbnail: null,
      fileName: null,
      imageUrl: null,
      thumbnailBlob: null,
    }),
}));
