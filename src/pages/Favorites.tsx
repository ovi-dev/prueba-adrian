import { useFavoritesStore } from "../store/useFavoritesStore";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">❤️ Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes personajes favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((char) => (
            <div key={char.id} className="border p-2 rounded-lg shadow-md">
              <Link to={`/others/${char.id}`}>
                <img
                  src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                  alt={char.name}
                  className="w-full h-56 object-cover rounded-md"
                  loading="lazy"
                />
                <h3 className="text-center font-bold mt-2">{char.name}</h3>
              </Link>
              <button
                onClick={() => toggleFavorite(char)}
                className={`mt-2 px-4 py-2 rounded w-full transition-colors cursor-pointer ${
                  favorites.some((fav) => fav.id === char.id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-black hover:bg-gray-800 text-white"
                }`}
              >
                {favorites.some((fav) => fav.id === char.id)
                  ? "❤️ Quitar"
                  : "🤍 Favorito"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
