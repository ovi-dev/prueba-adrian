import { useFavoritesStore } from "../store/useFavoritesStore";

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
              <img
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                alt={char.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-center font-bold mt-2">{char.name}</h3>
              <button
                onClick={() => toggleFavorite(char)}
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
