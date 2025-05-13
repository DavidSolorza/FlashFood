import React from 'react';
import { formatearPrecio } from '../productos/utils';

const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: 'Hamburguesa Doble Carne', precio: 23000, imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80' },
  { id: 2, nombre: 'Papas Medianas', precio: 4000, imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
  { id: 3, nombre: 'Pizza Pepperoni', precio: 22500, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { id: 4, nombre: 'Bebida 500ml', precio: 3500, imagen: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80' },
  { id: 5, nombre: 'Wrap de Pollo', precio: 16000, imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
];

export default function ModalCrearPedido({ modalCrear, cerrarModalCrear, pasoActual, setPasoActual, carrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, calcularTotal, datosCliente, setDatosCliente, continuarADatos, volverAProductos, finalizarCompra }) {
  if (!modalCrear) return null;

  return (
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
  );
} 