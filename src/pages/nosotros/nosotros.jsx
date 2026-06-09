import {
  FaCode,
  FaDatabase,
  FaNetworkWired,
  FaMobileAlt,
  FaShieldAlt,
  FaProjectDiagram,
} from "react-icons/fa";
import { MateriaItem } from "../../components";
import styles from "./nosotros.module.css";

const materias = [
  {
    id: 1,
    icono: FaCode,
    nombre: "Programación Integrativa de Componentes Web",
    descripcion:
      "Desarrollo de aplicaciones web modernas mediante React, componentes reutilizables y consumo de APIs REST.",
  },
  {
    id: 2,
    icono: FaDatabase,
    nombre: "Modelado Avanzado de Bases de Datos",
    descripcion:
      "Diseño, optimización y administración de bases de datos relacionales y no relacionales.",
  },
  {
    id: 3,
    icono: FaNetworkWired,
    nombre: "Inteligencia Artificial",
    descripcion: "Redes Neurologicas y programación en PyCharm.",
  },
  {
    id: 4,
    icono: FaMobileAlt,
    nombre: "Desarrollo Web para integración Tecnológica",
    descripcion:
      "Creación de aplicaciones nativas e híbridas, aplicaciones con DataFirst y CodeFirst.",
  },
  {
    id: 5,
    icono: FaShieldAlt,
    nombre: "Lectura y Escritura de Textos Académicos",
    descripcion:
      "Redacción académica, análisis crítico de textos y desarrollo de habilidades de comunicación escrita en el ámbito académico.",
  },
  {
    id: 6,
    icono: FaProjectDiagram,
    nombre: "Practica Profesional",
    descripcion:
      "Desarrollo de proyectos prácticos en colaboración con empresas, aplicando conocimientos técnicos y habilidades profesionales en un entorno real de trabajo.",
  },
];

export const NosotrosPage = () => {
  return (
    <div className={styles.nosotros}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Nosotros</h1>
        <p className={styles.desc}>
          Asignaturas del período lectivo 202650 — Ingeniería en Tecnologías de
          la Información.
        </p>
      </div>
      <div className={styles.lista}>
        {materias.map((m) => (
          <MateriaItem
            key={m.id}
            icono={m.icono}
            nombre={m.nombre}
            descripcion={m.descripcion}
          />
        ))}
      </div>
    </div>
  );
};
