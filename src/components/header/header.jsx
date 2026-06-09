import styles from "./header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.brand}>Componentes Web</h1>
      <nav className={styles.nav}>
        <Link className={styles.itemMenu} to="/">
          Inicio
        </Link>
        <Link className={styles.itemMenu} to="/nosotros">
          Nosotros
        </Link>
        <Link className={styles.itemMenu} to="/contactos">
          Contactos
        </Link>
        <Link className={styles.itemMenu} to="/personajes">
          Personajes
        </Link>
      </nav>
    </header>
  );
};
