import { create } from "zustand";

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

interface FavoritesState {
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => {
  const storedFavorites = localStorage.getItem("favorites");
  const initialFavorites: Character[] = storedFavorites
    ? JSON.parse(storedFavorites)
    : [];

  return {
    favorites: initialFavorites,
    toggleFavorite: (character) =>
      set((state) => {
        const isFav = state.favorites.some((fav) => fav.id === character.id);
        let updatedFavorites;

        if (isFav) {
          updatedFavorites = state.favorites.filter(
            (fav) => fav.id !== character.id,
          );
        } else {
          updatedFavorites = [...state.favorites, character];
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites };
      }),
  };
});
