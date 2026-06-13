import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./header";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Header", () => {
  test("muestra el título de la asignatura", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Componentes Web")).toBeInTheDocument();
  });

  test("muestra el enlace de navegación Inicio", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  test("muestra el enlace de navegación Nosotros", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Nosotros")).toBeInTheDocument();
  });

  test("muestra el enlace de navegación Contactos", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Contactos")).toBeInTheDocument();
  });

  test("muestra el enlace de navegación Personajes", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Personajes")).toBeInTheDocument();
  });

  test("los enlaces apuntan a las rutas correctas", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("Inicio").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Nosotros").closest("a")).toHaveAttribute(
      "href",
      "/nosotros",
    );
    expect(screen.getByText("Contactos").closest("a")).toHaveAttribute(
      "href",
      "/contactos",
    );
    expect(screen.getByText("Personajes").closest("a")).toHaveAttribute(
      "href",
      "/personajes",
    );
  });
});
