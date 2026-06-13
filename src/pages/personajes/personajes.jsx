import { useState, useEffect } from "react";
import { obtenerPersonajes } from "../../services/rick-and-morty-service";
import { PersonajeCard } from "../../components";
import styles from "./personajes.module.css";

export const PersonajesPage = () => {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const getPersonajes = async () => {
      const data = await obtenerPersonajes();
      setPersonajes(data);
    };

    getPersonajes();
  }, []);

  return (
    <div className={styles.personajesPage}>
      <h1 className={styles.title}>Personajes de Rick and Morty</h1>
      <div className={styles.contenedorPersonaje}>
        {personajes.map((personaje) => (
          <PersonajeCard
            key={personaje.id}
            nombre={personaje.name}
            especie={personaje.species}
            url={personaje.image}
          />
        ))}
      </div>
    </div>
  );
};
