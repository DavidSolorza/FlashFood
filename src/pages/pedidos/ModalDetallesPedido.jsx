import React from 'react';
import { formatearPrecio } from '../productos/utils';

export default function ModalDetallesPedido({ modal, cerrarModal, cambiarEstado, eliminarPedido }) {
  if (!modal) return null;

  return (
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
  );
} 