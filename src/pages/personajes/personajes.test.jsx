import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PersonajesPage } from "./personajes";

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              species: "Human",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
            {
              id: 2,
              name: "Morty Smith",
              species: "Human",
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            },
          ],
        }),
    }),
  ),
);

describe("PersonajesPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("muestra el título de la página", () => {
    render(<PersonajesPage />);
    expect(
      screen.getByText("Personajes de Rick and Morty"),
    ).toBeInTheDocument();
  });

  test("carga personajes desde la API", async () => {
    render(<PersonajesPage />);
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
  });

  test("carga y muestra el segundo personaje", async () => {
    render(<PersonajesPage />);
    expect(await screen.findByText("Morty Smith")).toBeInTheDocument();
  });

  test("llama a fetch con la URL correcta", async () => {
    render(<PersonajesPage />);
    await screen.findByText("Rick Sanchez");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character",
    );
  });
});
