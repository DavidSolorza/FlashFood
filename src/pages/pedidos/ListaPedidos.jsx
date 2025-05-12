import React from 'react';
import { formatearPrecio } from '../productos/utils';

export default function ListaPedidos({ pedidosFiltrados, abrirModal }) {
  return (
    <div className="catalogo-lista-pedidos" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 16,
      maxWidth: '100%',
      margin: '0 auto',
      padding: '8px',
      justifyItems: 'center',
      alignItems: 'start',
      width: '100%',
    }}>
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
  );
} 