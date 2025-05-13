// src/App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/login';
import Chatbot from './pages/Chatbot/Chatbot';
import Graficos from './pages/Graficos/Graficos';
import CrudInconvenientes from './pages/Inconvenientes/CrudInconvenientes';
import NotificacionesPedidos from './pages/Notificaciones/NotificacionesPedidos';
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
          <Route path="/inconvenientes" element={<CrudInconvenientes />} />
          <Route path="/notificaciones" element={<NotificacionesPedidos />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/graficos" element={<Graficos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
