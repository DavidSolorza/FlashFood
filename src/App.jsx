import '../src/styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/LoginPage';
import CustomersPage from './pages/CustomersPage';
import { CustomerProvider } from './context/CustomerContext'; // ⬅️ IMPORTA EL PROVIDER

function App() {
  return (
    <div className="App">
      <CustomerProvider> {/* ⬅️ ENVUELVE TODO */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/clientes" element={<CustomersPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </CustomerProvider>
    </div>
  );
}

export default App;
