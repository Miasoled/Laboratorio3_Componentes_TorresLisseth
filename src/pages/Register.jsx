import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowForwardRounded,
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import api from "../services/api";
import authImage from "../assets/rick_and_morty.webp";
import styles from "./auth.module.css";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", correo: "", password: "" });
  const [estado, setEstado] = useState({ tipo: "", texto: "" });
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  const cambiar = ({ target }) =>
    setForm((actual) => ({ ...actual, [target.name]: target.value }));

  const enviar = async (event) => {
    event.preventDefault();
    setCargando(true);
    setEstado({ tipo: "", texto: "" });
    try {
      const { data } = await api.post("/auth/register", form);
      setEstado({ tipo: "success", texto: data.mensaje });
      setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      setEstado({
        tipo: "error",
        texto:
          error.response?.data?.mensaje || "No se pudo completar el registro.",
      });
    } finally {
      setCargando(false);
    }
  };

  return (  
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.visual}>
          <img src={authImage} alt="Rick y Morty" />
          <div className={styles.visualCopy}>
            <strong>Empieza tu próxima idea</strong>
            <span>
              Organiza productos y descubre el desarrollo web desde un solo
              lugar.
            </span>
          </div>
        </div>
        <div className={styles.formPanel}>
          <div className={styles.formInner}>
            <p className={styles.eyebrow}>Únete a WebLab</p>
            <Typography variant="h5" component="h1">
              Crear una cuenta
            </Typography>
            <p className={styles.subtitle}>
              Completa tus datos para comenzar. Solo tomará un momento.
            </p>
            {estado.texto && (
              <Alert severity={estado.tipo} sx={{ mb: 2 }}>
                {estado.texto}
              </Alert>
            )}
            <Box component="form" className={styles.form} onSubmit={enviar}>
              <TextField
                size="small"
                label="Nombre completo"
                name="nombre"
                value={form.nombre}
                onChange={cambiar}
                required
                autoComplete="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                label="Correo electrónico"
                type="email"
                name="correo"
                value={form.correo}
                onChange={cambiar}
                required
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                label="Contraseña"
                helperText="Utiliza al menos 6 caracteres"
                type={mostrarPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={cambiar}
                inputProps={{ minLength: 6 }}
                required
                autoComplete="new-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Mostrar u ocultar contraseña"
                        onClick={() => setMostrarPassword((valor) => !valor)}
                      >
                        {mostrarPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={cargando}
                endIcon={<ArrowForwardRounded />}
                sx={{ mt: 0.25 }}
              >
                {cargando ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
            </Box>
            <p className={styles.footer}>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
