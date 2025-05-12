import React, { useState } from 'react';
import '../../styles/pedidosCrud.css';
import ListaPedidos from './ListaPedidos';
import ModalCrearPedido from './ModalCrearPedido';
import ModalDetallesPedido from './ModalDetallesPedido';

// Datos de ejemplo
const PEDIDOS_INICIALES = [
  {
    id: 1,
    numero: 'PED-001',
    fecha: '2024-03-20',
    cliente: 'Juan Pérez',
    estado: 'En preparación',
    total: 45000,
    items: [
      { id: 1, nombre: 'Hamburguesa Doble Carne', cantidad: 2, precio: 23000 },
      { id: 2, nombre: 'Papas Medianas', cantidad: 1, precio: 4000 },
    ],
    direccion: {
      id: 1,
      calle: 'Calle 123',
      numero: '45-67',
      ciudad: 'Bogotá',
      departamento: 'Cundinamarca',
      codigoPostal: '110111'
    },
    telefono: '3001234567'
  },
  {
    id: 2,
    numero: 'PED-002',
    fecha: '2024-03-20',
    cliente: 'María García',
    estado: 'Entregado',
    total: 32000,
    items: [
      { nombre: 'Pizza Pepperoni', cantidad: 1, precio: 22500 },
      { nombre: 'Bebida 500ml', cantidad: 2, precio: 3500 },
    ],
    direccion: 'Carrera 78 #90-12',
    telefono: '3007654321'
  },
  {
    id: 3,
    numero: 'PED-003',
    fecha: '2024-03-20',
    cliente: 'Carlos López',
    estado: 'Pendiente',
    total: 16000,
    items: [
      { nombre: 'Wrap de Pollo', cantidad: 1, precio: 16000 },
    ],
    direccion: 'Avenida 5 #23-45',
    telefono: '3009876543'
  }
];

export default function PedidosCrud() {
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [modal, setModal] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [modalCrear, setModalCrear] = useState(false);
  const [pasoActual, setPasoActual] = useState('productos');
  const [carrito, setCarrito] = useState([]);
  const [datosCliente, setDatosCliente] = useState({
    cliente: '',
    telefono: '',
    direccion: {
      calle: '',
      numero: '',
      ciudad: '',
      departamento: '',
      codigoPostal: ''
    }
  });

  const pedidosFiltrados = pedidos.filter(p => {
    const coincideBusqueda = 
      p.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.cliente.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideEstado = filtroEstado === 'todos' || p.estado === filtroEstado;
    
    return coincideBusqueda && coincideEstado;
  });

  const abrirModal = (pedido) => {
    setModal(pedido);
  };

  const cerrarModal = () => setModal(null);

  const cambiarEstado = (nuevoEstado) => {
    if (modal) {
      const pedidosActualizados = pedidos.map(p => 
        p.id === modal.id ? { ...p, estado: nuevoEstado } : p
      );
      setPedidos(pedidosActualizados);
      setModal({ ...modal, estado: nuevoEstado });
    }
  };

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const calcularTotal = (items) => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const iniciarCompra = () => {
    setCarrito([]);
    setPasoActual('productos');
    setModalCrear(true);
  };

  const continuarADatos = () => {
    if (carrito.length > 0) {
      setPasoActual('datos');
    }
  };

  const volverAProductos = () => {
    setPasoActual('productos');
  };

  const finalizarCompra = () => {
    const nuevoId = Math.max(...pedidos.map(p => p.id)) + 1;
    const pedidoCompleto = {
      id: nuevoId,
      numero: `PED-${String(nuevoId).padStart(3, '0')}`,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      total: calcularTotal(carrito),
      items: carrito,
      ...datosCliente
    };
    setPedidos([...pedidos, pedidoCompleto]);
    cerrarModalCrear();
    setCarrito([]);
    setDatosCliente({
      cliente: '',
      telefono: '',
      direccion: {
        calle: '',
        numero: '',
        ciudad: '',
        departamento: '',
        codigoPostal: ''
      }
    });
  };

  const eliminarPedido = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      setPedidos(pedidos.filter(p => p.id !== id));
      if (modal && modal.id === id) {
        cerrarModal();
      }
    }
  };

  const cerrarModalCrear = () => {
    setModalCrear(false);
    setPasoActual('productos');
    setCarrito([]);
    setDatosCliente({
      cliente: '',
      telefono: '',
      direccion: {
        calle: '',
        numero: '',
        ciudad: '',
        departamento: '',
        codigoPostal: ''
      }
    });
  };

  return (
    <div className="catalogo-pedidos-dark">
      <div className="catalogo-barra-busqueda">
        <input
          type="text"
          placeholder="Buscar por número de pedido o cliente..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          aria-label="Buscar pedido"
        />
        <select 
          value={filtroEstado} 
          onChange={e => setFiltroEstado(e.target.value)}
          className="filtro-estado"
        >
          <option value="todos">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En preparación">En preparación</option>
          <option value="Entregado">Entregado</option>
        </select>
        <button className="btn-crear" onClick={iniciarCompra}>
          Crear Nuevo Pedido
        </button>
      </div>

      <ListaPedidos pedidosFiltrados={pedidosFiltrados} abrirModal={abrirModal} />

      <ModalDetallesPedido modal={modal} cerrarModal={cerrarModal} cambiarEstado={cambiarEstado} eliminarPedido={eliminarPedido} />

      <ModalCrearPedido modalCrear={modalCrear} cerrarModalCrear={cerrarModalCrear} pasoActual={pasoActual} setPasoActual={setPasoActual} carrito={carrito} agregarAlCarrito={agregarAlCarrito} quitarDelCarrito={quitarDelCarrito} actualizarCantidad={actualizarCantidad} calcularTotal={calcularTotal} datosCliente={datosCliente} setDatosCliente={setDatosCliente} continuarADatos={continuarADatos} volverAProductos={volverAProductos} finalizarCompra={finalizarCompra} />
    </div>
  );
} 