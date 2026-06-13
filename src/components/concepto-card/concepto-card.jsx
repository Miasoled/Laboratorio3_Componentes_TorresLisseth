import PropTypes from "prop-types";
import styles from "./concepto-card.module.css";

export const ConceptoCard = ({ imagen, titulo, descripcion }) => {
  return (
    <div className={styles.conceptoCard}>
      <div className={styles.imageWrapper}>
        <img src={imagen} alt={titulo} className={styles.imagen} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
      </div>
    </div>
  );
};

ConceptoCard.propTypes = {
  imagen: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
};
  