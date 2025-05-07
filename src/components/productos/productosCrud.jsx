import React, { useState } from 'react';
import '../../styles/productoCrud.css';

const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Hamburguesa Doble Carne',
    precio: 23000,
    restaurante: 'Kevin Delivery',
    descripcion: 'Deliciosa hamburguesa con doble carne, queso, vegetales frescos y salsa secreta.',
    imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    extras: [
      { id: 'queso', label: 'Queso adicional', precio: 3000 },
      { id: 'papas', label: 'Papas medianas', precio: 4000 },
      { id: 'bebida', label: 'Bebida 500ml', precio: 3500 },
    ],
  },
  {
    id: 2,
    nombre: 'Pizza Pepperoni',
    precio: 22500,
    restaurante: 'Pizza House',
    descripcion: 'Pizza con pepperoni, queso mozzarella y salsa especial.',
    imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    extras: [
      { id: 'queso', label: 'Queso extra', precio: 3500 },
      { id: 'borde', label: 'Borde de queso', precio: 4000 },
    ],
  },
  {
    id: 3,
    nombre: 'Wrap de Pollo',
    precio: 16000,
    restaurante: 'Wraps & More',
    descripcion: 'Wrap de pollo con vegetales frescos y salsa de la casa.',
    imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    extras: [
      { id: 'guacamole', label: 'Guacamole', precio: 2500 },
      { id: 'papas', label: 'Papas pequeñas', precio: 2000 },
    ],
  },
];

function formatearPrecio(valor) {
  return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

export default function ProductosCrud() {
  const [busqueda, setBusqueda] = useState('');
  const [modal, setModal] = useState(null); // producto seleccionado
  const [cantidad, setCantidad] = useState(1);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  // Filtrado por nombre o restaurante
  const productosFiltrados = PRODUCTOS.filter(
    p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.restaurante.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Modal: abrir producto
  const abrirModal = (producto) => {
    setModal(producto);
    setCantidad(1);
    setExtrasSeleccionados([]);
  };

  // Modal: cerrar
  const cerrarModal = () => setModal(null);

  // Modal: manejar extras
  const toggleExtra = (id) => {
    setExtrasSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // Modal: calcular total
  const calcularTotal = () => {
    if (!modal) return 0;
    let total = modal.precio * cantidad;
    extrasSeleccionados.forEach((id) => {
      const extra = modal.extras.find((e) => e.id === id);
      if (extra) total += extra.precio * cantidad;
    });
    return total;
  };

  return (
    <div className="catalogo-productos-dark">
      <div className="catalogo-barra-busqueda">
        <input
          type="text"
          placeholder="Buscar producto o restaurante..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          aria-label="Buscar producto o restaurante"
        />
      </div>
      <div className="catalogo-lista-productos">
        {productosFiltrados.length === 0 && (
          <div className="catalogo-vacio">No se encontraron productos.</div>
        )}
        {productosFiltrados.map(producto => (
          <div
            key={producto.id}
            className="catalogo-card-producto"
            onClick={() => abrirModal(producto)}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles de ${producto.nombre}`}
          >
            <img src={producto.imagen} alt={producto.nombre} />
            <div className="catalogo-info-producto">
              <h4>{producto.nombre}</h4>
              <span className="catalogo-precio">{formatearPrecio(producto.precio)}</span>
              <span className="catalogo-restaurante">{producto.restaurante}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de producto */}
      {modal && (
        <div className="catalogo-modal-bg" onClick={cerrarModal}>
          <div className="catalogo-modal" onClick={e => e.stopPropagation()}>
            <button className="catalogo-modal-cerrar" onClick={cerrarModal} aria-label="Cerrar">×</button>
            <img src={modal.imagen} alt={modal.nombre} className="catalogo-modal-img" />
            <h2>{modal.nombre}</h2>
            <span className="catalogo-modal-restaurante">{modal.restaurante}</span>
            <p className="catalogo-modal-desc">{modal.descripcion}</p>
            <div className="catalogo-modal-extras">
              <p>Extras:</p>
              {modal.extras.map(extra => (
                <label key={extra.id}>
                  <input
                    type="checkbox"
                    checked={extrasSeleccionados.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                  />{' '}
                  {extra.label} (+{formatearPrecio(extra.precio)})
                </label>
              ))}
            </div>
            <div className="catalogo-modal-cantidad">
              <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(c => c + 1)}>+</button>
            </div>
            <button className="catalogo-modal-agregar">
              Agregar al carrito - {formatearPrecio(calcularTotal())}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
