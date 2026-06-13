import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  test("muestra el nombre de la institución", () => {
    render(<Footer />);
    expect(screen.getByText(/ESPE/i)).toBeInTheDocument();
  });

  test("muestra la asignatura en el footer", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Programación Integrativa de Componentes Web/i),
    ).toBeInTheDocument();
  });

  test("muestra el año actual dinámicamente", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
