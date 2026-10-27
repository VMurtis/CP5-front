import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./pages/Catalogo";
import DetalheReceita from "./pages/DetalheReceita";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/receitas/:id" element={<DetalheReceita />} />
        <Route
          path="*"
          element={
            <main>
              <h1>Página não encontrada</h1>
              <a href="/">Voltar ao catálogo</a>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
