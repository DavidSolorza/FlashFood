import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGlobal } from '../../contextoGlobal';
import '../../styles/productoCrud.css';
import Carrito from './Carrito';
import CatalogoProductos from './CatalogoProductos';
import ModalDetalles from './ModalDetalles';
import ModalDireccion from './ModalDireccion';

const API_URL = 'http://127.0.0.1:5000';

export default function ProductosCrud() {
  const [productos, setProductos] = useState([]);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState({});
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('');
  const [nuevaDireccion, setNuevaDireccion] = useState({
    ciudad: '', calle: '', barrio: ''
  });
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [animacion, setAnimacion] = useState(false);
  const [sidebarAbierto, setSidebarAbierto] = useState(() => {
    const guardado = localStorage.getItem('sidebarAbierto');
    return guardado === null ? false : JSON.parse(guardado);
  });
  const [modalDetalles, setModalDetalles] = useState({ abierto: false, producto: null });
  const [extrasModalSeleccionados, setExtrasModalSeleccionados] = useState([]);
  const [modalDireccion, setModalDireccion] = useState(false);

  const {
    carrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, limpiarCarrito,
    direcciones, agregarDireccion, crearPedido,
    buscadorVisible, setBuscadorVisible, busquedaGlobal, setBusquedaGlobal
  } = useGlobal();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    if (carrito.length === 0) {
      setSidebarAbierto(false);
      localStorage.setItem('sidebarAbierto', 'false');
    }
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem('sidebarAbierto', JSON.stringify(sidebarAbierto));
  }, [sidebarAbierto]);

  const productosFiltrados = productos.filter(
    p =>
      (busquedaGlobal === '' ||
        p.nombre.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
        p.restaurante.toLowerCase().includes(busquedaGlobal.toLowerCase()))
  );

  const toggleExtraModal = (idExtra) => {
    setExtrasModalSeleccionados(prev =>
      prev.includes(idExtra)
        ? prev.filter(e => e !== idExtra)
        : [...prev, idExtra]
    );
  };

  const handleAgregarAlCarrito = (producto) => {
    const extrasIds = extrasSeleccionados[producto.id] || [];
    const precioExtras = extrasIds.reduce((acc, id) => {
      const extra = producto.extras.find(e => e.id === id);
      return acc + (extra ? extra.precio : 0);
    }, 0);
    const productoParaCarrito = {
      id: producto.id + '-' + extrasIds.sort().join('-'),
      nombre: producto.nombre,
      precio: producto.precio + precioExtras,
      cantidad: 1,
      imagen: producto.imagen,
      extras: extrasIds.map(id => {
        const extra = producto.extras.find(e => e.id === id);
        return extra ? extra.label : '';
      }).filter(Boolean)
    };
    agregarAlCarrito(productoParaCarrito);
    setExtrasSeleccionados(prev => ({ ...prev, [producto.id]: [] }));
    setSidebarAbierto(true);
  };

  const handleAgregarDesdeModal = () => {
    if (!modalDetalles.producto) return;
    const producto = modalDetalles.producto;
    const extrasIds = extrasModalSeleccionados;
    const precioExtras = extrasIds.reduce((acc, id) => {
      const extra = producto.extras.find(e => e.id === id);
      return acc + (extra ? extra.precio : 0);
    }, 0);
    const productoParaCarrito = {
      id: producto.id + '-' + extrasIds.sort().join('-'),
      nombre: producto.nombre,
      precio: producto.precio + precioExtras,
      cantidad: 1,
      imagen: producto.imagen,
      extras: extrasIds.map(id => {
        const extra = producto.extras.find(e => e.id === id);
        return extra ? extra.label : '';
      }).filter(Boolean)
    };
    agregarAlCarrito(productoParaCarrito);
    setExtrasModalSeleccionados([]);
    setModalDetalles({ abierto: false, producto: null });
    setSidebarAbierto(true);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleConfirmarPedido = () => {
    if (!nombreCliente || !telefonoCliente || !direccionSeleccionada) return;
    const direccionObj = direcciones.find(d => d.id === direccionSeleccionada);
    crearPedido({
      id: Date.now(),
      cliente: nombreCliente,
      telefono: telefonoCliente,
      direccion: direccionObj,
      items: carrito,
      total: totalCarrito,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente'
    });
    setAnimacion(true);
    setTimeout(() => {
      setAnimacion(false);
      limpiarCarrito();
      setNombreCliente('');
      setTelefonoCliente('');
      setDireccionSeleccionada('');
    }, 2500);
  };

  const handleGuardarDireccion = () => {
    if (!nuevaDireccion.calle || !nuevaDireccion.ciudad || !nuevaDireccion.barrio) return;
    const nueva = {
      ...nuevaDireccion,
      id: Date.now().toString()
    };
    agregarDireccion(nueva);
    setDireccionSeleccionada(nueva.id);
    setNuevaDireccion({ ciudad: '', calle: '', barrio: '' });
    setModalDireccion(false);
  };

  const isMobile = window.innerWidth < 900;

  return (
    <div className="catalogo-productos-dark" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: '100vh',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {buscadorVisible && (
        <div style={{
          position: 'fixed',
          top: 70,
          left: 0,
          width: '100vw',
          background: '#23272f',
          zIndex: 4000,
          boxShadow: '0 2px 12px #0006',
          padding: '18px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <input
            type="text"
            placeholder="Buscar producto o restaurante..."
            value={busquedaGlobal}
            onChange={e => setBusquedaGlobal(e.target.value)}
            aria-label="Buscar producto o restaurante"
            style={{
              background: '#181c22',
              border: 'none',
              color: '#fff',
              fontSize: '1.1rem',
              padding: '14px 18px',
              borderRadius: 8,
              width: '100%',
              maxWidth: 420,
              boxShadow: '0 2px 8px #0002',
              outline: 'none',
              margin: '0 auto',
              display: 'block',
            }}
            autoFocus
          />
          <button
            onClick={() => setBuscadorVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              marginLeft: 18,
              cursor: 'pointer',
              fontWeight: 700
            }}
            aria-label="Cerrar búsqueda"
          >×</button>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%', overflow: 'auto', scrollbarWidth: 'none' }}
        className="catalogo-scroll-hide"
      >
        <h2 style={{
          color: '#ffb84d',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '1.7rem',
          margin: '0 0 10px 0',
          letterSpacing: 0.5,
          paddingTop: 8,
          textShadow: '0 2px 8px #0006'
        }}>Catálogo de productos</h2>
        <CatalogoProductos
          productosFiltrados={productosFiltrados}
          setModalDetalles={setModalDetalles}
          handleAgregarAlCarrito={handleAgregarAlCarrito}
        />
      </div>

      {((carrito.length > 0 && sidebarAbierto) || (sidebarAbierto && carrito.length > 0) || (!isMobile && carrito.length > 0 && sidebarAbierto)) && (
        <Carrito
          carrito={carrito}
          actualizarCantidad={actualizarCantidad}
          quitarDelCarrito={quitarDelCarrito}
          totalCarrito={totalCarrito}
          nombreCliente={nombreCliente}
          setNombreCliente={setNombreCliente}
          telefonoCliente={telefonoCliente}
          setTelefonoCliente={setTelefonoCliente}
          direccionSeleccionada={direccionSeleccionada}
          setDireccionSeleccionada={setDireccionSeleccionada}
          direcciones={direcciones}
          setModalDireccion={setModalDireccion}
          handleConfirmarPedido={handleConfirmarPedido}
          animacion={animacion}
          setSidebarAbierto={setSidebarAbierto}
        />
      )}

      <ModalDetalles
        modalDetalles={modalDetalles}
        setModalDetalles={setModalDetalles}
        extrasModalSeleccionados={extrasModalSeleccionados}
        toggleExtraModal={toggleExtraModal}
        handleAgregarDesdeModal={handleAgregarDesdeModal}
      />

      <ModalDireccion
        modalDireccion={modalDireccion}
        setModalDireccion={setModalDireccion}
        nuevaDireccion={nuevaDireccion}
        setNuevaDireccion={setNuevaDireccion}
        handleGuardarDireccion={handleGuardarDireccion}
      />
    </div>
  );
}

/* Ocultar scrollbars en todo el catálogo y panel lateral */
<style>
{`
.catalogo-scroll-hide {
  scrollbar-width: none !important;
}
.catalogo-scroll-hide::-webkit-scrollbar {
  display: none !important;
}
`}
</style>
