import React from 'react';
import { formatearPrecio } from './utils';

export default function ModalDetalles({ modalDetalles, setModalDetalles, extrasModalSeleccionados, toggleExtraModal, handleAgregarDesdeModal }) {
  if (!modalDetalles.abierto || !modalDetalles.producto) return null;

  const producto = modalDetalles.producto;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      zIndex: 6000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s',
    }}>
      <div style={{
        background: '#23272f',
        borderRadius: 22,
        padding: '38px 32px 32px 32px',
        minWidth: 320,
        maxWidth: 400,
        width: '92vw',
        boxShadow: '0 8px 32px #000a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        position: 'relative',
      }}>
        <button onClick={() => setModalDetalles({ abierto: false, producto: null })} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>×</button>
        <img src={producto.imagen} alt={producto.nombre} style={{ width: 120, height: 120, borderRadius: 18, objectFit: 'cover', marginBottom: 8, boxShadow: '0 2px 12px #0004' }} />
        <h3 style={{ color: '#ffb84d', fontWeight: 700, fontSize: '1.25rem', textAlign: 'center', marginBottom: 2 }}>{producto.nombre}</h3>
        <span style={{ color: '#ffb84d', fontWeight: 700, fontSize: 18 }}>{formatearPrecio(producto.precio)}</span>
        <span style={{ color: '#bfc9d1', fontSize: 15, marginBottom: 6 }}>{producto.restaurante}</span>
        <p style={{ color: '#6ec1ff', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>{producto.descripcion}</p>
        {producto.extras.length > 0 && (
          <div style={{ width: '100%', marginBottom: 10 }}>
            <span style={{ color: '#ffb84d', fontWeight: 500, fontSize: 14 }}>Extras para añadir:</span>
            {producto.extras.map(extra => (
              <label key={extra.id} style={{ display: 'block', fontSize: 14, color: '#fff', margin: '2px 0 2px 12px', textAlign: 'left' }}>
                <input
                  type="checkbox"
                  checked={extrasModalSeleccionados.includes(extra.id)}
                  onChange={() => toggleExtraModal(extra.id)}
                  style={{ marginRight: 7 }}
                />{' '}
                {extra.label} (+{formatearPrecio(extra.precio)})
              </label>
            ))}
          </div>
        )}
        <button className="btn-agregar" style={{ width: '100%', fontWeight: 700, fontSize: 16, borderRadius: 8, padding: '12px 0', marginTop: 8 }} onClick={handleAgregarDesdeModal}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
} 