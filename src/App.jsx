// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/App.css';
import { ProveedorGlobal } from './contextoGlobal';

import Login from './components/login';
import ProductosCrud from './components/productos/productosCrud';
import PedidosCrud from './components/pedidos/pedidosCrud';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ListRestaurants from './pages/Restaurant/List';


function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="App">
      {!isLoginPage && <Navbar />}

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<ProductosCrud />} />
          <Route path="/pedidos" element={<PedidosCrud />} />
          <Route path="/restaurants" element={<ListRestaurants/>} />

          {/* Agrega más rutas aquí */}
        </Routes>
      </div>

      {!isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ProveedorGlobal>
        <AppContent />
      </ProveedorGlobal>
    </Router>
  );
}
