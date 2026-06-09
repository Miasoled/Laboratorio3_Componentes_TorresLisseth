import { ConceptoCard } from "../../components";
import styles from "./inicio.module.css";

const conceptos = [
  {
    id: 1,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png?_=20220125121207",
    titulo: "React",
    descripcion:
      "Biblioteca de JavaScript para construir interfaces de usuario interactivas y reactivas mediante componentes reutilizables.",
  },
  {
    id: 2,
    imagen: "https://vitejs.dev/logo.svg",
    titulo: "Vite",
    descripcion:
      "Herramienta de construcción ultrarrápida que proporciona un entorno de desarrollo ágil para proyectos frontend modernos.",
  },
  {
    id: 3,
    imagen: "https://reactrouter.com/favicon-light.png",
    titulo: "React Router",
    descripcion:
      "Librería de enrutamiento para React que permite la navegación entre páginas sin recargar la aplicación (SPA).",
  },
  {
    id: 4,
    imagen:
      "https://raw.githubusercontent.com/css-modules/logos/master/css-modules-logo.png",
    titulo: "CSS Modules",
    descripcion:
      "Sistema de módulos CSS que encapsula los estilos por componente, evitando conflictos de nombres en aplicaciones grandes.",
  },
  {
    id: 5,
    imagen: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
    titulo: "PropTypes",
    descripcion:
      "Herramienta para validar las propiedades que reciben los componentes React, mejorando la calidad y mantenibilidad del código.",
  },
  {
    id: 6,
    imagen:
      "https://www.iconpacks.net/icons/free-icons-6/free-rest-api-blue-logo-icon-22098-thumb.png",
    titulo: "REST API",
    descripcion:
      "Interfaz que permite consumir datos externos de forma asíncrona mediante Fetch API, useState y useEffect.",
  },
];

export const InicioPage = () => {
  return (
    <div className={styles.inicio}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Componentes Reutilizables con React</h1>
        <p className={styles.desc}>
          Exploración de las tecnologías y conceptos fundamentales para el
          desarrollo de aplicaciones web modernas.
        </p>
      </div>
      <div className={styles.grid}>
        {conceptos.map((c) => (
          <ConceptoCard
            key={c.id}
            imagen={c.imagen}
            titulo={c.titulo}
            descripcion={c.descripcion}
          />
        ))}
      </div>
    </div>
  );
};
