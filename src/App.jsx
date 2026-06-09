import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  InicioPage,
  NosotrosPage,
  ContactosPage,
  PersonajesPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
          <Route path="/personajes" element={<PersonajesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
