import React from 'react';
import { formatearPrecio } from './utils';

export default function CatalogoProductos({ productosFiltrados, setModalDetalles, handleAgregarAlCarrito }) {
  return (
    <div className="catalogo-lista-productos" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 14,
      maxWidth: '100%',
      margin: '0 auto',
      padding: '8px 0 0 0',
      justifyItems: 'center',
      alignItems: 'start',
      width: '100%',
      scrollbarWidth: 'none',
    }}>
      {productosFiltrados.length === 0 && (
        <div className="catalogo-vacio">No se encontraron productos.</div>
      )}
      {productosFiltrados.map(producto => (
        <div
          key={producto.id}
          className="catalogo-card-producto"
          role="region"
          aria-label={`Producto ${producto.nombre}`}
          style={{
            background: '#23272f',
            borderRadius: 18,
            boxShadow: '0 4px 24px #0004',
            padding: '18px 12px 14px 12px',
            minWidth: 210,
            maxWidth: 250,
            width: '100%',
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            margin: '0 auto',
          }}
        >
          <img src={producto.imagen} alt={producto.nombre} style={{ width: 70, height: 70, borderRadius: '14px', objectFit: 'cover', marginBottom: 8, boxShadow: '0 2px 8px #0003' }} />
          <div className="catalogo-info-producto" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.18rem', color: '#fff', marginBottom: 4 }}>{producto.nombre}</h4>
            <span className="catalogo-precio" style={{ color: '#ffb84d', fontWeight: 700, fontSize: 19, marginBottom: 2 }}>{formatearPrecio(producto.precio)}</span>
            <span className="catalogo-restaurante" style={{ color: '#bfc9d1', fontSize: 14, marginBottom: 8 }}>{producto.restaurante}</span>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', width: '100%', gap: 8, marginTop: 10 }}>
              <button className="btn-agregar" style={{ flex: 1, fontWeight: 700, fontSize: 14, borderRadius: 8, padding: '8px 0', transition: 'all 0.18s' }}
                onMouseOver={e => { e.currentTarget.style.background = '#1ecb4f'; }}
                onMouseOut={e => { e.currentTarget.style.background = ''; }}
                onClick={() => handleAgregarAlCarrito(producto)}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 