import PropTypes from "prop-types";
import styles from "./personaje-card.module.css";

export const PersonajeCard = ({ nombre, especie, url }) => {
  return (
    <div className={styles.personajeCard}>
      <div className={styles.imageWrapper}>
        <img src={url} alt={nombre} className={styles.imagen} />
        <div className={styles.especieBadge}>{especie}</div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
      </div>
    </div>
  );
};

PersonajeCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  especie: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
