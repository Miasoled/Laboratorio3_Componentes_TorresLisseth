import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConceptoCard } from "./concepto-card";

describe("ConceptoCard", () => {
  const props = {
    titulo: "React",
    descripcion:
      "Biblioteca de JavaScript para construir interfaces de usuario interactivas.",
    imagen: "https://ejemplo.com/react.png",
  };

  test("muestra correctamente el título recibido por Props", () => {
    render(<ConceptoCard {...props} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("muestra correctamente la descripción recibida por Props", () => {
    render(<ConceptoCard {...props} />);
    expect(
      screen.getByText(
        "Biblioteca de JavaScript para construir interfaces de usuario interactivas.",
      ),
    ).toBeInTheDocument();
  });

  test("renderiza la imagen con el atributo src correcto", () => {
    render(<ConceptoCard {...props} />);
    const img = screen.getByRole("img", { name: /react/i });
    expect(img).toHaveAttribute("src", "https://ejemplo.com/react.png");
  });

  test("la imagen tiene el atributo alt igual al título", () => {
    render(<ConceptoCard {...props} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "React");
  });
});
