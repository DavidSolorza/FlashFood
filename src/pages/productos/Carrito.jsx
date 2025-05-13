import React, { useState } from 'react';
import { formatearPrecio } from './utils';

export default function Carrito({ carrito, actualizarCantidad, quitarDelCarrito, totalCarrito, nombreCliente, setNombreCliente, telefonoCliente, setTelefonoCliente, direccionSeleccionada, setDireccionSeleccionada, direcciones, setModalDireccion, animacion, setSidebarAbierto }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const handleConfirmarPedido = () => {
    const nuevoPedido = {
      id: Date.now(),
      numero: `Pedido ${Date.now()}`,
      cliente: nombreCliente,
      fecha: new Date().toLocaleDateString(),
      estado: 'Confirmado',
      total: totalCarrito
    };
    console.log('Pedido confirmado:', nuevoPedido);
    setNombreCliente('');
    setTelefonoCliente('');
    setDireccionSeleccionada('');
  };

  return (
    <>
      <button
        onClick={() => setMostrarCarrito(!mostrarCarrito)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 3100,
          background: '#ffb84d',
          border: 'none',
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        🛒
      </button>

      {mostrarCarrito && (
        <div className="carrito-flotante"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3000,
            width: '50vw',
            height: '60vh',
            maxWidth: 420,
            maxHeight: 500,
            background: '#23272f',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
            padding: 20,
            boxSizing: 'border-box',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}>
          <style>
            {`.carrito-flotante::-webkit-scrollbar { display: none; }`}
          </style>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 6, marginBottom: 18, minHeight: 60, scrollbarWidth: 'none' }}
            className="catalogo-scroll-hide"
          >
            <button className="sidebar-cerrar" onClick={() => setSidebarAbierto(false)} style={{position:'absolute',top:18,right:18,fontSize:24,background:'none',border:'none',color:'#fff',cursor:'pointer'}}>×</button>
            <h3 style={{textAlign:'center',marginBottom:18}}>Tu pedido</h3>
            {carrito.length === 0 ? (
              <div style={{ color: '#fff', margin: '32px 0' }}>El carrito está vacío.</div>
            ) : (
              <>
                {carrito.map(item => (
                  <div key={item.id} className="carrito-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#23272f',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px #0002',
                    padding: '8px 10px',
                    marginBottom: 10,
                    gap: 10,
                    minHeight: 54,
                    height: 54,
                    width: '100%',
                  }}>
                    <img src={item.imagen} alt={item.nombre} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid #181c22', marginRight: 8 }} />
                    <div style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: 110 }}>{item.nombre}</span>
                      {item.extras && item.extras.length > 0 && (
                        <div style={{ fontSize: 11, color: '#ffb84d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 110 }}>{item.extras.join(', ')}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center', minWidth: 70 }}>
                      <button className="controles-cantidad-btn" style={{ background: '#ffb84d', color: '#23272f', border: 'none', borderRadius: 8, width: 26, height: 26, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                      <span style={{ color: '#ffb84d', fontWeight: 700, fontSize: 15, minWidth: 16, textAlign: 'center' }}>{item.cantidad}</span>
                      <button className="controles-cantidad-btn" style={{ background: '#ffb84d', color: '#23272f', border: 'none', borderRadius: 8, width: 26, height: 26, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                    </div>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginLeft: 8, minWidth: 60, textAlign: 'right', display: 'block' }}>{formatearPrecio(item.precio * item.cantidad)}</span>
                    <button onClick={() => quitarDelCarrito(item.id)} className="btn-quitar" style={{ marginLeft: 8, width: 26, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, padding: 0, background: '#ff4d4f', color: '#fff', border: 'none', cursor: 'pointer' }}>×</button>
                  </div>
                ))}
                <div className="carrito-total">
                  <strong>Total:</strong>
                  <strong>{formatearPrecio(totalCarrito)}</strong>
                </div>
                <div className="form-datos" style={{ marginTop: 24 }}>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombreCliente}
                    onChange={e => setNombreCliente(e.target.value)}
                    className="input-sidebar"
                    style={{marginBottom:10}}
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={telefonoCliente}
                    onChange={e => setTelefonoCliente(e.target.value)}
                    className="input-sidebar"
                    style={{marginBottom:10}}
                  />
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ color: '#ffb84d', fontWeight: 500, marginBottom: 6, display:'block' }}>Dirección de entrega:</label>
                    <select
                      value={direccionSeleccionada}
                      onChange={e => setDireccionSeleccionada(e.target.value)}
                      className="input-sidebar"
                      style={{marginBottom:10}}
                    >
                      <option value="">Selecciona una dirección</option>
                      {direcciones.map(dir => (
                        <option key={dir.id} value={dir.id}>
                          {dir.calle} #{dir.numero}, {dir.ciudad}
                        </option>
                      ))}
                    </select>
                    <button className="btn-agregar" style={{ marginTop: 8, width: '100%' }} onClick={() => setModalDireccion(true)}>
                      + Nueva dirección
                    </button>
                  </div>
                  <button
                    className="btn-finalizar"
                    style={{ marginTop: 12 }}
                    onClick={handleConfirmarPedido}
                    disabled={!nombreCliente || !telefonoCliente || !direccionSeleccionada || carrito.length === 0}
                  >
                    Confirmar pedido
                  </button>
                </div>
                {animacion && (
                  <div className="animacion-exito">
                    <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Comida animación" style={{ width: 120, margin: '24px auto' }} />
                    <div style={{ color: '#ffb84d', fontWeight: 700, fontSize: 22, textAlign: 'center', marginTop: 12 }}>
                      ¡Pedido realizado con éxito!
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 