// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Importa el Layout
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Others from "./pages/Others";

function App() {
  return (
    <Router>
      <Layout>
        {" "}
        {/* Aquí envuelves las rutas con el Layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/others/:id" element={<Others />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
