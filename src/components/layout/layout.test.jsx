import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layout";

// Layout necesita BrowserRouter porque incluye Header que usa Link y useLocation
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Layout", () => {
  test("renderiza el contenido hijo correctamente", () => {
    renderWithRouter(
      <Layout>
        <h1>Contenido de prueba</h1>
      </Layout>,
    );
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });

  test("incluye el Header con el enlace de Inicio", () => {
    renderWithRouter(
      <Layout>
        <p>Página de prueba</p>
      </Layout>,
    );
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  test("incluye el Footer con información institucional", () => {
    renderWithRouter(
      <Layout>
        <p>Contenido</p>
      </Layout>,
    );
    expect(screen.getByText(/ESPE/i)).toBeInTheDocument();
  });

  test("renderiza múltiples elementos hijos sin errores", () => {
    renderWithRouter(
      <Layout>
        <p>Párrafo uno</p>
        <p>Párrafo dos</p>
      </Layout>,
    );
    expect(screen.getByText("Párrafo uno")).toBeInTheDocument();
    expect(screen.getByText("Párrafo dos")).toBeInTheDocument();
  });
});
