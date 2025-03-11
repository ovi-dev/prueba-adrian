import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../api/marvel";

interface Character {
  comicsList: any;
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
        <h2 className="text-2xl font-semibold mb-2 uppercase">Cómics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {character.comicsList.length > 0 ? (
            character.comicsList.map(
              (comic: {
                id: Key | null | undefined;
                thumbnail: string | undefined;
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }) => (
                <div
                  key={comic.id}
                  className="flex flex-col items-center bg-gray-200 p-3 rounded-md"
                >
                  <img
                    src={comic.thumbnail}
                    alt={String(comic.title)}
                    className="w-32 h-40 object-cover rounded-md"
                  />
                  <p className="text-center text-sm mt-2">{comic.title}</p>
                </div>
              ),
            )
          ) : (
            <p className="uppercase">No hay cómics disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Others;
