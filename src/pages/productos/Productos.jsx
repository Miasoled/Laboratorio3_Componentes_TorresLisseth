import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DeleteOutlineRounded,
  EditOutlined,
  ImageNotSupportedOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
} from "../../services/productos";
import styles from "./productos.module.css";

const VACIO = { nombre: "", descripcion: "", precio: "", stock: "", imagen: "" };

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(VACIO);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [cargando, setCargando] = useState(true);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const esAdmin = usuario.rol === "ADMIN";

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const { data } = await listarProductos();
      setProductos(data);
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.response?.data?.mensaje || "Error al consultar los productos.",
      });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    // La carga inicial sincroniza la vista con la API al montar la página.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  }, [cargar]);

  const cambiar = ({ target }) =>
    setForm((actual) => ({ ...actual, [target.name]: target.value }));

  const limpiar = () => {
    setForm(VACIO);
    setEditando(null);
  };

  const guardar = async (event) => {
    event.preventDefault();
    const datos = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };
    try {
      if (editando) {
        await actualizarProducto(editando, datos);
        setMensaje({ tipo: "success", texto: "Producto actualizado correctamente." });
      } else {
        await crearProducto(datos);
        setMensaje({ tipo: "success", texto: "Producto registrado correctamente." });
      }
      limpiar();
      await cargar();
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.response?.data?.mensaje || "Error al procesar la solicitud.",
      });
    }
  };

  const editar = (producto) => {
    setEditando(producto.id);
    setForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      stock: producto.stock ?? "",
      imagen: producto.imagen || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminar = async () => {
    if (!productoAEliminar) return;
    setEliminando(true);
    try {
      await eliminarProducto(productoAEliminar.id);
      setMensaje({ tipo: "success", texto: "Producto eliminado correctamente." });
      setProductoAEliminar(null);
      await cargar();
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.response?.data?.mensaje || "Error al eliminar el producto.",
      });
    } finally {
      setEliminando(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.title}>
        <div>
          <h2>Gestión de productos</h2>
          <p>Consulta el inventario{esAdmin ? " y administra sus registros" : ""}.</p>
        </div>
        <span className={styles.role}>{usuario.rol || "USER"}</span>
      </header>

      {mensaje.texto && (
        <p className={`${styles.message} ${styles[mensaje.tipo]}`} role="alert">
          {mensaje.texto}
        </p>
      )}

      <div className={`${styles.workspace} ${!esAdmin ? styles.onlyCatalog : ""}`}>
        {esAdmin && (
          <Paper component="aside" className={styles.formPanel} elevation={0}>
            <Box component="form" className={styles.form} onSubmit={guardar}>
              <div>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: ".1em" }}>
                  Inventario
                </Typography>
                <Typography variant="h5" component="h3">
                  {editando ? "Editar producto" : "Nuevo producto"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>
                  {editando ? "Actualiza la información seleccionada." : "Completa los datos para agregarlo al catálogo."}
                </Typography>
              </div>
              <TextField size="small" label="Nombre" name="nombre" value={form.nombre} onChange={cambiar} required />
              <TextField size="small" label="Descripción" name="descripcion" value={form.descripcion} onChange={cambiar} multiline minRows={3} />
              <div className={styles.formRow}>
                <TextField size="small" label="Precio" type="number" name="precio" inputProps={{ min: 0, step: .01 }} value={form.precio} onChange={cambiar} required />
                <TextField size="small" label="Stock" type="number" name="stock" inputProps={{ min: 0 }} value={form.stock} onChange={cambiar} required />
              </div>
              <TextField size="small" label="URL de imagen" type="url" name="imagen" value={form.imagen} onChange={cambiar} placeholder="https://..." />
              <Stack direction="row" gap={1}>
                <Button fullWidth type="submit" variant="contained">
                  {editando ? "Actualizar" : "Guardar producto"}
                </Button>
                {editando && <Button type="button" variant="outlined" onClick={limpiar}>Cancelar</Button>}
              </Stack>
            </Box>
          </Paper>
        )}

        <section className={styles.catalog}>
          <Box className={styles.catalogHeader}>
            <div>
              <Typography variant="h5" component="h3">Catálogo</Typography>
              <Typography variant="body2" color="text.secondary">
                {productos.length} {productos.length === 1 ? "producto registrado" : "productos registrados"}
              </Typography>
            </div>
          </Box>
          {cargando ? (
            <p className={styles.empty}>Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p className={styles.empty}>No existen productos registrados.</p>
          ) : (
            <div className={styles.grid}>
          {productos.map((producto) => (
            <Card
              className={styles.card}
              key={producto.id}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
                overflow: "hidden",
                transition: "transform .25s ease, box-shadow .25s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 18px 45px rgba(11,70,73,.13)",
                },
              }}
            >
              {producto.imagen ? (
                <div className={styles.imageWrapper}>
                  <CardMedia
                    component="img"
                    src={producto.imagen}
                    alt={producto.nombre}
                    onError={({ currentTarget }) => {
                      currentTarget.style.display = "none";
                      currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <Box className={`${styles.placeholder} ${styles.imageError}`}>
                    <ImageNotSupportedOutlined />
                    <span>Imagen no disponible</span>
                  </Box>
                </div>
              ) : (
                <Box className={styles.placeholder}>
                  <ImageNotSupportedOutlined />
                  <span>Sin imagen</span>
                </Box>
              )}
              <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2.5 }}>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: ".09em", lineHeight: 1.4 }}>
                  Producto #{producto.id}
                </Typography>
                <Typography variant="h6" component="h3" sx={{ mt: .5, lineHeight: 1.25 }}>
                  {producto.nombre}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 2, lineHeight: 1.55, flex: 1 }}>
                  {producto.descripcion || "Sin descripción"}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                  <Typography variant="h5" color="primary.dark" sx={{ fontWeight: 800 }}>
                    ${Number(producto.precio).toFixed(2)}
                  </Typography>
                  <Chip icon={<Inventory2Outlined />} label={`Stock: ${producto.stock}`} size="small" color={producto.stock > 0 ? "success" : "error"} variant="outlined" sx={{ fontWeight: 700 }} />
                </Stack>
              </CardContent>
                {esAdmin && (
                  <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0, gap: 1 }}>
                    <Button fullWidth variant="outlined" startIcon={<EditOutlined />} onClick={() => editar(producto)}>Editar</Button>
                    <Button fullWidth variant="outlined" color="error" startIcon={<DeleteOutlineRounded />} onClick={() => setProductoAEliminar(producto)}>Eliminar</Button>
                  </CardActions>
                )}
            </Card>
          ))}
            </div>
          )}
        </section>
      </div>
      <Dialog
        open={Boolean(productoAEliminar)}
        onClose={() => !eliminando && setProductoAEliminar(null)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 4, p: .5 } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.25, pb: 1 }}>
          <Box sx={{ width: 42, height: 42, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "#ffebee", color: "error.main" }}>
            <DeleteOutlineRounded />
          </Box>
          Eliminar producto
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas eliminar <strong>{productoAEliminar?.nombre}</strong>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setProductoAEliminar(null)} disabled={eliminando} color="inherit">
            Cancelar
          </Button>
          <Button onClick={eliminar} disabled={eliminando} variant="contained" color="error" startIcon={<DeleteOutlineRounded />}>
            {eliminando ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
