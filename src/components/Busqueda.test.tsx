import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Busqueda } from "./Busqueda";

test("El input de búsqueda se renderiza y actualiza su valor cuando el usuario escribe", () => {
  const setSearchTermMock = vi.fn(); // Creamos una función simulada

  render(<Busqueda setSearchTerm={setSearchTermMock} />);

  // Verificamos que el input se renderizó
  const input = screen.getByPlaceholderText("Buscar Superhéroe");
  expect(input).toBeInTheDocument();

  // Simulamos que el usuario escribe "Spider-Man"
  fireEvent.change(input, { target: { value: "Spider-Man" } });

  // Verificamos que la función setSearchTerm fue llamada con el valor correcto
  expect(setSearchTermMock).toHaveBeenCalledTimes(1);
  expect(setSearchTermMock).toHaveBeenCalledWith("Spider-Man");
});
