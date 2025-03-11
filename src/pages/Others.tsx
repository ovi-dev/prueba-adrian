import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../api/marvel";

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  comics: { items: { name: string }[] };
}

const Others = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      const data = await getCharacterById(id);
      setCharacter(data);
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      <div className="container max-w-4xl flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-lg shadow-lg">
        {/* Imagen del personaje */}
        <div className="shrink-0">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="w-64 h-64 object-cover rounded-md"
          />
        </div>
        {/* Información del personaje */}
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
          <p className="mb-4">
            {character.description || "Sin descripción disponible."}
          </p>
        </div>
      </div>
      {/* Sección de cómics */}
      <div className="container max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Cómics</h2>
        <div className="overflow-x-auto flex gap-4 p-2">
          {character.comics.items.length > 0 ? (
            character.comics.items.map((comic, index) => (
              <div
                key={index}
                className="bg-gray-200 p-3 rounded-md min-w-[150px] text-center"
              >
                {comic.name}
              </div>
            ))
          ) : (
            <p className="uppercase">No hay cómics disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Others;
