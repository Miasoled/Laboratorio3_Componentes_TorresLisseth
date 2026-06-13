import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MateriaItem } from "./materia-item"
import { FaCode } from "react-icons/fa"

describe("MateriaItem", () => {
  const props = {
    nombre: "Programación Integrativa de Componentes Web",
    descripcion: "Desarrollo de aplicaciones web modernas con React.",
    icono: FaCode,
  }

  test("muestra correctamente el nombre de la asignatura", () => {
    render(<MateriaItem {...props} />)
    expect(
      screen.getByText("Programación Integrativa de Componentes Web")
    ).toBeInTheDocument()
  })

  test("muestra correctamente la descripción de la asignatura", () => {
    render(<MateriaItem {...props} />)
    expect(
      screen.getByText("Desarrollo de aplicaciones web modernas con React.")
    ).toBeInTheDocument()
  })

  test("renderiza sin errores cuando no se pasa ícono", () => {
    render(
      <MateriaItem
        nombre="Base de Datos"
        descripcion="Administración de bases de datos."
      />
    )
    expect(screen.getByText("Base de Datos")).toBeInTheDocument()
  })
})