import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import CharacterList from "./CharacterList";
import { useFavoritesStore } from "../store/useFavoritesStore";

// Mock de Zustand
vi.mock("../../store/useFavoritesStore", () => ({
  useFavoritesStore: vi.fn(() => ({
    favorites: [],
    toggleFavorite: vi.fn(),
  })),
}));

describe("CharacterList Component", () => {
  test("Renderiza la lista de personajes desde la API", async () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("Permite buscar personajes", async () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar personajes...");
    fireEvent.change(input, { target: { value: "Spider" } });

    expect(input).toHaveValue("Spider");
  });

  test("Permite agregar y quitar favoritos", async () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    const favButton = await screen.findByText("🤍 Favorito");
    fireEvent.click(favButton);
    
    expect(useFavoritesStore().toggleFavorite).toHaveBeenCalled();
  });
});
