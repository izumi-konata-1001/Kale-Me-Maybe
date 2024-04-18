// This file defines a Zustand store for state management across 
// the application by allowing any component to access and update data.
import { create } from 'zustand';

const useStore = create(set => ({
  favorites: [],
  updateFavorites: (newFavorites) => set({ favorites: newFavorites }),
  setFavorites: (favorites) => set({ favorites }),
}));

export default useStore;
