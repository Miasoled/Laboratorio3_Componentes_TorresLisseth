import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PersonajeCard } from "./personaje-card"

describe("PersonajeCard", () => {
  const props = {
    nombre: "Rick Sanchez",
    especie: "Human",
    url: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  }

  test("muestra correctamente el nombre del personaje", () => {
    render(<PersonajeCard {...props} />)
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument()
  })

  test("muestra correctamente la especie del personaje", () => {
    render(<PersonajeCard {...props} />)
    expect(screen.getByText("Human")).toBeInTheDocument()
  })

  test("renderiza la imagen con el src correcto", () => {
    render(<PersonajeCard {...props} />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    )
  })

  test("la imagen tiene el alt con el nombre del personaje", () => {
    render(<PersonajeCard {...props} />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("alt", "Rick Sanchez")
  })
})