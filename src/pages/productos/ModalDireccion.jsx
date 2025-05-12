import React from 'react';

export default function ModalDireccion({ modalDireccion, setModalDireccion, nuevaDireccion, setNuevaDireccion, handleGuardarDireccion }) {
  if (!modalDireccion) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 5000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s',
    }}>
      <div style={{
        background: '#23272f',
        borderRadius: 22,
        padding: '38px 32px 32px 32px',
        minWidth: 300,
        maxWidth: 370,
        width: '92vw',
        boxShadow: '0 8px 32px #000a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 16,
      }}>
        <h3 style={{color:'#ffb84d',marginBottom:18, textAlign:'center', fontSize: '1.35rem', fontWeight:700, letterSpacing:0.5}}>Nueva dirección</h3>
        <input
          type="text"
          placeholder="Ciudad"
          value={nuevaDireccion.ciudad}
          onChange={e => setNuevaDireccion({ ...nuevaDireccion, ciudad: e.target.value })}
          className="input-sidebar"
          style={{marginBottom:10, boxShadow:'0 1px 8px #0002', background:'#2d313a', border:'1.5px solid #333', color:'#fff', fontWeight:500, fontSize:'1.08rem'}}
        />
        <input
          type="text"
          placeholder="Calle"
          value={nuevaDireccion.calle}
          onChange={e => setNuevaDireccion({ ...nuevaDireccion, calle: e.target.value })}
          className="input-sidebar"
          style={{marginBottom:10, boxShadow:'0 1px 8px #0002', background:'#2d313a', border:'1.5px solid #333', color:'#fff', fontWeight:500, fontSize:'1.08rem'}}
        />
        <input
          type="text"
          placeholder="Barrio"
          value={nuevaDireccion.barrio}
          onChange={e => setNuevaDireccion({ ...nuevaDireccion, barrio: e.target.value })}
          className="input-sidebar"
          style={{marginBottom:18, boxShadow:'0 1px 8px #0002', background:'#2d313a', border:'1.5px solid #333', color:'#fff', fontWeight:500, fontSize:'1.08rem'}}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          marginTop: 8,
        }}>
          <button className="btn-finalizar" style={{flex: 1, fontSize: '1.08rem', padding: '12px 0', background: '#28a745', color: '#fff', border: 'none', borderRadius: 8}} onClick={handleGuardarDireccion}>
            Guardar dirección
          </button>
          <button
            onClick={() => setModalDireccion(false)}
            style={{
              flex: 1,
              background: '#ff4d4f',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
} 