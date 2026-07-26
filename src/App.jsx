import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  InicioPage,
  NosotrosPage,
  ContactosPage,
  PersonajesPage,
  LoginPage,
  RegisterPage,
  ProductosPage,
} from "./pages";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
          <Route path="/personajes" element={<PersonajesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route
            path="/productos"
            element={
              <ProtectedRoute>
                <ProductosPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<InicioPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
