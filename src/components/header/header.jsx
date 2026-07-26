import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { CodeRounded, LoginRounded, LogoutRounded } from "@mui/icons-material";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const autenticado = Boolean(localStorage.getItem("token"));

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const enlaces = [["/", "Inicio"], ["/nosotros", "Nosotros"], ["/contactos", "Contactos"], ["/personajes", "Personajes"]];

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(255,255,255,.88)", color: "text.primary", borderBottom: "1px solid", borderColor: "divider", backdropFilter: "blur(16px)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", mr: { md: 2 } }}>
            <Box sx={{ width: 38, height: 38, borderRadius: 2.5, display: "grid", placeItems: "center", color: "white", background: "linear-gradient(135deg,#078f92,#91c83e)" }}>
              <CodeRounded />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, display: { xs: "none", sm: "block" } }}>WebLab</Typography>
          </Box>
          <Box component="nav" sx={{ display: "flex", alignItems: "center", gap: .25, flex: 1, overflowX: "auto" }}>
            {enlaces.map(([to, label]) => (
              <Button key={to} component={NavLink} to={to} end={to === "/"} sx={{ color: "text.secondary", whiteSpace: "nowrap", "&.active": { color: "primary.main", bgcolor: "#e5f5f1" } }}>
                {label}
              </Button>
            ))}
            {autenticado ? (
              <>
                <Button component={NavLink} to="/productos" sx={{ color: "text.secondary", "&.active": { color: "primary.main", bgcolor: "#e5f5f1" } }}>Productos</Button>
                <Button startIcon={<LogoutRounded />} onClick={cerrarSesion} color="inherit" sx={{ ml: "auto", whiteSpace: "nowrap" }}>Salir</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" startIcon={<LoginRounded />} sx={{ ml: "auto", whiteSpace: "nowrap", display: { xs: "none", md: "inline-flex" } }}>Ingresar</Button>
                <Button component={Link} to="/registro" variant="contained" disableElevation sx={{ whiteSpace: "nowrap" }}>Crear cuenta</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
