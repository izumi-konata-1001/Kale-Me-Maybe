// This file defines a Zustand store for state management across
// the application by allowing any component to access and update data.
// Run `npm install zustand` to install it.
import { create } from "zustand";

const useStore = create((set) => ({
  favorites: [],
  searchResults: [],
  updateFavorites: (newFavorites) => set({ favorites: newFavorites }),
  setFavorites: (favorites) => set({ favorites }),
  setSearchResults: (searchResults) => set({ searchResults: searchResults }),
}));

export default useStore;
