
import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Función para eliminar de favoritos
  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">❤️ Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes personajes favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((char) => (
            <div key={char.id} className="border p-2 rounded-lg shadow-md">
              <img
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                alt={char.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-center font-bold mt-2">{char.name}</h3>
              <button
                onClick={() => removeFavorite(char.id)}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
              >
                <span className="text-black">X</span> Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
