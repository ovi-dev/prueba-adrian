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
<>

   
<div className="w-screen  flex items-center justify-center bg-black text-white p-6">
  <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center">
    {/* Imagen del personaje */}
    <div className="w-64 h-64 flex justify-center items-center">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-full h-full object-cover rounded-md"
      />
    </div>

    {/* Información del personaje */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left md:ml-6">
      <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
      <p className="max-w-lg">{character.description || "Sin descripción disponible."}</p>
    </div>
  </div>
</div>

    <div className="flex flex-col items-center min-h-screen  p-4 ">
    
      {/* Sección de cómics */}
      <section className="container max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 uppercase">Cómics</h2>
        <div className="flex overflow-x-auto space-x-4">
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
          className="flex flex-col items-center p-3 min-w-[12rem]"
            >
          <img
            src={comic.thumbnail}
            alt={String(comic.title)}
            className="w-48 h-60 object-cover"
          />
          <p className="text-center text-sm mt-2 font-bold">
            {comic.title}
          </p>
            </div>
          )
        )
          ) : (
        <p className="uppercase">No hay cómics disponibles.</p>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default Others;
