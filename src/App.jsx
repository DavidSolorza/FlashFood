// src/App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/login';
import PedidosCrud from './pages/pedidos/pedidosCrud';
import ProductosCrud from './pages/productos/productosCrud';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<ProductosCrud />} />
          <Route path="/pedidos" element={<PedidosCrud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
