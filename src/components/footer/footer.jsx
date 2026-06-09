import styles from "./footer.module.css";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brand}>
            <span className={styles.accent}>{"<"}</span>ReactLab
            <span className={styles.accent}>{"/>"}</span>
          </span>
          <span className={styles.sep}>—</span>
          <span>Programación Integrativa de Componentes Web</span>
        </div>
        <div className={styles.right}>
          <span>Universidad de las Fuerzas Armadas ESPE</span>
          <span className={styles.sep}>·</span>
          <span>{year}</span>
        </div>
      </div>
    </footer>
  );
};
