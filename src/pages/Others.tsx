import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../api/marvel";

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

const Others = () => {
  const { id } = useParams<{ id: string }>(); // Captura el ID de la URL
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      const data = await getCharacterById(id); // Llama a la API con el ID
      setCharacter(data);
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{character.name}</h1>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-64 h-64 object-cover rounded-md"
      />
      <p className="mt-4">{character.description || "Sin descripción disponible."}</p>
    </div>
  );
};

export default Others;
