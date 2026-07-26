import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import api from "../services/api";
import authImage from "../assets/rick_and_morty.webp";
import styles from "./auth.module.css";

export default function Login() {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cambiar = ({ target }) =>
    setForm((actual) => ({ ...actual, [target.name]: target.value }));

  const enviar = async (event) => {
    event.preventDefault();
    setCargando(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate(location.state?.from || "/productos", { replace: true });
    } catch (err) {
      setError(err.response?.data?.mensaje || "No fue posible iniciar sesión.");
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
            <strong>Construye, aprende y crea</strong>
            <span>Tu espacio para explorar componentes web modernos.</span>
          </div>
        </div>
        <div className={styles.formPanel}>
          <div className={styles.formInner}>
            <p className={styles.eyebrow}>Bienvenido de nuevo</p>
            <Typography variant="h5" component="h1">
              Iniciar sesión
            </Typography>
            <p className={styles.subtitle}>
              Ingresa tus credenciales para acceder al inventario.
            </p>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" className={styles.form} onSubmit={enviar}>
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
                type={mostrarPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={cambiar}
                required
                autoComplete="current-password"
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
                {cargando ? "Ingresando..." : "Iniciar sesión"}
              </Button>
            </Box>
            <p className={styles.footer}>
              ¿No tienes una cuenta?{" "}
              <Link to="/registro">Regístrate gratis</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
