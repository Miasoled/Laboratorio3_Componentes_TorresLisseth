import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserTie,
  FaIdCard,
  FaUniversity,
} from "react-icons/fa";
import styles from "./contactos.module.css";

const docente = [
  {
    id: 1,
    icon: FaUserTie,
    label: "Docente",
    value: "Ing. Kevin Chuquitarco, Mgtr.",
  },
  {
    id: 2,
    icon: FaEnvelope,
    label: "Correo Institucional",
    value: "kjchuquitarco@espe.edu.ec",
  },
  {
    id: 3,
    icon: FaMapMarkerAlt,
    label: "Institución",
    value: "Universidad de las Fuerzas Armadas ESPE — Sede Sangolquí",
  },
  { id: 4, icon: FaGlobe, label: "Sitio Web", value: "www.espe.edu.ec" },
];

const estudiante = [
  {
    id: 1,
    icon: FaUserTie,
    label: "Estudiante",
    value: "Jacqueline Lisseth Torres Getial",
  },
  {
    id: 2,
    icon: FaIdCard,
    label: "Número de Matrícula",
    value: "L00437147",
  },
  {
    id: 3,
    icon: FaEnvelope,
    label: "Correo Institucional",
    value: "jltorres15@espe.edu.ec",
  },
  {
    id: 4,
    icon: FaUniversity,
    label: "Carrera",
    value: "Ingeniería en Tecnologías de la Información",
  },
];

const SeccionContacto = ({ titulo, datos }) => (
  <div className={styles.seccion}>
    <h2 className={styles.seccionTitulo}>{titulo}</h2>
    <div className={styles.grid}>
      {datos.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.id} className={styles.card}>
            <div className={styles.iconBox}>
              <Icon size={24} />
            </div>
            <div>
              <p className={styles.cardLabel}>{c.label}</p>
              <p className={styles.cardValue}>{c.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const ContactosPage = () => {
  return (
    <div className={styles.contactos}>
      <div className={styles.pageHeader}>
        <p className={styles.label}>Información de Contacto</p>
        <h1 className={styles.title}>Contactos</h1>
        <p className={styles.desc}>
          Datos de contacto del docente y estudiante a cargo de la asignatura.
        </p>
      </div>
      <SeccionContacto titulo="Docente" datos={docente} />
      <SeccionContacto titulo="Estudiante" datos={estudiante} />
    </div>
  );
};
