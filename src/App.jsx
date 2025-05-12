// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/App.css';
import { ProveedorGlobal } from './contextoGlobal';

import Login from './components/login';
import ProductosCrud from './pages/productos/productosCrud';
import PedidosCrud from './pages/pedidos/pedidosCrud';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ListRestaurants from './pages/Restaurant/List';
import CreateRestaurant from './pages/Restaurant/create';


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
          <Route path="/restaurants/create" element={<CreateRestaurant/>} />


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
