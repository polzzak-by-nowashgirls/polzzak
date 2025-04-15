import { create } from 'zustand';

interface LocationState {
  lat: number;
  lng: number;
  setLatLng: (lat: number, lng: number) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  lat: 0,
  lng: 0,
  setLatLng: (lat, lng) => set({ lat, lng }),
}));

export default useLocationStore;
