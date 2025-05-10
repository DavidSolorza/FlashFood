import React, { useState } from 'react';
import '../../styles/pedidosCrud.css';

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

const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: 'Hamburguesa Doble Carne', precio: 23000, imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80' },
  { id: 2, nombre: 'Papas Medianas', precio: 4000, imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
  { id: 3, nombre: 'Pizza Pepperoni', precio: 22500, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { id: 4, nombre: 'Bebida 500ml', precio: 3500, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80' },
  { id: 5, nombre: 'Wrap de Pollo', precio: 16000, imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
];

function formatearPrecio(valor) {
  return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

export default function PedidosCrud() {
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [modal, setModal] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [modalCrear, setModalCrear] = useState(false);
  const [pasoActual, setPasoActual] = useState('productos'); // 'productos' o 'datos'
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

  // Filtrado de pedidos
  const pedidosFiltrados = pedidos.filter(p => {
    const coincideBusqueda = 
      p.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.cliente.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideEstado = filtroEstado === 'todos' || p.estado === filtroEstado;
    
    return coincideBusqueda && coincideEstado;
  });

  // Funciones para el modal de detalles
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

  // Funciones para el carrito
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

  // Funciones para el proceso de compra
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

  // Funciones para eliminar pedido
  const eliminarPedido = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      setPedidos(pedidos.filter(p => p.id !== id));
      if (modal && modal.id === id) {
        cerrarModal();
      }
    }
  };

  // Función para cerrar el modal de creación y limpiar datos
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

      <div className="catalogo-lista-pedidos">
        {pedidosFiltrados.length === 0 && (
          <div className="catalogo-vacio">No se encontraron pedidos.</div>
        )}
        {pedidosFiltrados.map(pedido => (
          <div
            key={pedido.id}
            className="catalogo-card-pedido"
            onClick={() => abrirModal(pedido)}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles del pedido ${pedido.numero}`}
          >
            <div className="catalogo-info-pedido">
              <h4>{pedido.numero}</h4>
              <span className="catalogo-cliente">{pedido.cliente}</span>
              <span className="catalogo-fecha">{pedido.fecha}</span>
              <span className={`catalogo-estado estado-${pedido.estado.toLowerCase().replace(' ', '-')}`}>
                {pedido.estado}
              </span>
              <span className="catalogo-total">{formatearPrecio(pedido.total)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles del pedido */}
      {modal && (
        <div className="catalogo-modal-bg" onClick={cerrarModal}>
          <div className="catalogo-modal" onClick={e => e.stopPropagation()}>
            <button className="catalogo-modal-cerrar" onClick={cerrarModal} aria-label="Cerrar">×</button>
            <h2>{modal.numero}</h2>
            <div className="modal-info-cliente">
              <p><strong>Cliente:</strong> {modal.cliente}</p>
              <p><strong>Dirección:</strong> {modal.direccion.calle} {modal.direccion.numero}</p>
              <p><strong>Ciudad:</strong> {modal.direccion.ciudad}</p>
              <p><strong>Departamento:</strong> {modal.direccion.departamento}</p>
              <p><strong>Teléfono:</strong> {modal.telefono}</p>
              <p><strong>Fecha:</strong> {modal.fecha}</p>
            </div>
            <div className="modal-items">
              <h3>Items del pedido:</h3>
              {modal.items.map((item, index) => (
                <div key={index} className="modal-item">
                  <span>{item.cantidad}x {item.nombre}</span>
                  <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                </div>
              ))}
              <div className="modal-total">
                <strong>Total:</strong>
                <strong>{formatearPrecio(modal.total)}</strong>
              </div>
            </div>
            <div className="modal-estado">
              <h3>Estado actual: {modal.estado}</h3>
              <div className="modal-botones-estado">
                <button 
                  onClick={() => cambiarEstado('Pendiente')}
                  className={modal.estado === 'Pendiente' ? 'activo' : ''}
                >
                  Pendiente
                </button>
                <button 
                  onClick={() => cambiarEstado('En preparación')}
                  className={modal.estado === 'En preparación' ? 'activo' : ''}
                >
                  En preparación
                </button>
                <button 
                  onClick={() => cambiarEstado('Entregado')}
                  className={modal.estado === 'Entregado' ? 'activo' : ''}
                >
                  Entregado
                </button>
              </div>
            </div>
            <button 
              className="btn-eliminar"
              onClick={() => eliminarPedido(modal.id)}
            >
              Eliminar Pedido
            </button>
          </div>
        </div>
      )}

      {/* Modal de creación de pedido */}
      {modalCrear && (
        <div className="catalogo-modal-bg" onClick={cerrarModalCrear}>
          <div className={`catalogo-modal ${pasoActual === 'datos' ? 'modal-datos' : ''}`} onClick={e => e.stopPropagation()}>
            <button className="catalogo-modal-cerrar" onClick={cerrarModalCrear}>×</button>
            
            {pasoActual === 'productos' ? (
              <>
                <h2>Selecciona tus productos</h2>
                <div className="lista-productos-grid">
                  {PRODUCTOS_DISPONIBLES.map(producto => (
                    <div key={producto.id} className="producto-card">
                      <img src={producto.imagen} alt={producto.nombre} />
                      <div className="producto-info">
                        <h3>{producto.nombre}</h3>
                        <span className="producto-precio">{formatearPrecio(producto.precio)}</span>
                        <button 
                          className="btn-agregar"
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {carrito.length > 0 && (
                  <div className="carrito-resumen">
                    <h3>Tu pedido</h3>
                    {carrito.map(item => (
                      <div key={item.id} className="carrito-item">
                        <span>{item.nombre}</span>
                        <div className="controles-cantidad">
                          <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                        </div>
                        <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                        <button onClick={() => quitarDelCarrito(item.id)} className="btn-quitar">×</button>
                      </div>
                    ))}
                    <div className="carrito-total">
                      <strong>Total:</strong>
                      <strong>{formatearPrecio(calcularTotal(carrito))}</strong>
                    </div>
                    <button 
                      className="btn-continuar"
                      onClick={continuarADatos}
                    >
                      Continuar con la compra
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2>Datos de entrega</h2>
                <div className="form-datos">
                  <div className="form-grupo">
                    <label>Nombre completo:</label>
                    <input
                      type="text"
                      value={datosCliente.cliente}
                      onChange={e => setDatosCliente({...datosCliente, cliente: e.target.value})}
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="form-grupo">
                    <label>Teléfono:</label>
                    <input
                      type="tel"
                      value={datosCliente.telefono}
                      onChange={e => setDatosCliente({...datosCliente, telefono: e.target.value})}
                      placeholder="Tu número de teléfono"
                    />
                  </div>

                  <div className="form-grupo">
                    <h3>Dirección de entrega</h3>
                    <div className="direccion-grid">
                      <input
                        type="text"
                        value={datosCliente.direccion.calle}
                        onChange={e => setDatosCliente({
                          ...datosCliente,
                          direccion: {...datosCliente.direccion, calle: e.target.value}
                        })}
                        placeholder="Calle"
                      />
                      <input
                        type="text"
                        value={datosCliente.direccion.numero}
                        onChange={e => setDatosCliente({
                          ...datosCliente,
                          direccion: {...datosCliente.direccion, numero: e.target.value}
                        })}
                        placeholder="Número"
                      />
                      <input
                        type="text"
                        value={datosCliente.direccion.ciudad}
                        onChange={e => setDatosCliente({
                          ...datosCliente,
                          direccion: {...datosCliente.direccion, ciudad: e.target.value}
                        })}
                        placeholder="Ciudad"
                      />
                      <input
                        type="text"
                        value={datosCliente.direccion.departamento}
                        onChange={e => setDatosCliente({
                          ...datosCliente,
                          direccion: {...datosCliente.direccion, departamento: e.target.value}
                        })}
                        placeholder="Departamento"
                      />
                      <input
                        type="text"
                        value={datosCliente.direccion.codigoPostal}
                        onChange={e => setDatosCliente({
                          ...datosCliente,
                          direccion: {...datosCliente.direccion, codigoPostal: e.target.value}
                        })}
                        placeholder="Código Postal"
                      />
                    </div>
                  </div>

                  <div className="resumen-pedido">
                    <h3>Resumen del pedido</h3>
                    {carrito.map(item => (
                      <div key={item.id} className="resumen-item">
                        <span>{item.cantidad}x {item.nombre}</span>
                        <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                      </div>
                    ))}
                    <div className="resumen-total">
                      <strong>Total:</strong>
                      <strong>{formatearPrecio(calcularTotal(carrito))}</strong>
                    </div>
                  </div>

                  <div className="botones-accion">
                    <button 
                      className="btn-volver"
                      onClick={volverAProductos}
                    >
                      Volver a productos
                    </button>
                    <button 
                      className="btn-finalizar"
                      onClick={finalizarCompra}
                      disabled={!datosCliente.cliente || !datosCliente.telefono || !datosCliente.direccion.calle}
                    >
                      Finalizar pedido
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 