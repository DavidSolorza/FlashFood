import React, { useState, useEffect } from 'react';
import '../../styles/productoCrud.css';
import { useGlobal } from '../../contextoGlobal';

const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Hamburguesa Doble Carne',
    precio: 23000,
    restaurante: 'Kevin Delivery',
    descripcion: 'Doble carne, queso, vegetales frescos y salsa secreta.',
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
    descripcion: 'Pepperoni, queso mozzarella y salsa especial.',
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
    descripcion: 'Pollo, vegetales frescos y salsa de la casa.',
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
  const [extrasSeleccionados, setExtrasSeleccionados] = useState({});
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('');
  const [nuevaDireccion, setNuevaDireccion] = useState({
    ciudad: '', calle: '', barrio: ''
  });
  const [mostrarFormDireccion, setMostrarFormDireccion] = useState(false);
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [animacion, setAnimacion] = useState(false);
  const [sidebarAbierto, setSidebarAbierto] = useState(() => {
    const guardado = localStorage.getItem('sidebarAbierto');
    return guardado === null ? false : JSON.parse(guardado);
  });
  const [modalDetalles, setModalDetalles] = useState({ abierto: false, producto: null });
  const [extrasModalSeleccionados, setExtrasModalSeleccionados] = useState([]);

  const {
    carrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, limpiarCarrito,
    direcciones, agregarDireccion, crearPedido,
    buscadorVisible, setBuscadorVisible, busquedaGlobal, setBusquedaGlobal
  } = useGlobal();

  // Mostrar/ocultar sidebar según carrito y localStorage
  useEffect(() => {
    if (carrito.length === 0) {
      setSidebarAbierto(false);
      localStorage.setItem('sidebarAbierto', 'false');
    }
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem('sidebarAbierto', JSON.stringify(sidebarAbierto));
  }, [sidebarAbierto]);

  // Filtrado por nombre o restaurante
  const productosFiltrados = PRODUCTOS.filter(
    p =>
      (busquedaGlobal === '' ||
        p.nombre.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
        p.restaurante.toLowerCase().includes(busquedaGlobal.toLowerCase()))
  );

  // Manejar selección de extras por producto
  const toggleExtra = (idProducto, idExtra) => {
    setExtrasSeleccionados(prev => {
      const actuales = prev[idProducto] || [];
      return {
        ...prev,
        [idProducto]: actuales.includes(idExtra)
          ? actuales.filter(e => e !== idExtra)
          : [...actuales, idExtra]
      };
    });
  };

  // Manejar selección de extras en el modal de detalles
  const toggleExtraModal = (idExtra) => {
    setExtrasModalSeleccionados(prev =>
      prev.includes(idExtra)
        ? prev.filter(e => e !== idExtra)
        : [...prev, idExtra]
    );
  };

  // Agregar producto con extras seleccionados
  const handleAgregarAlCarrito = (producto) => {
    const extrasIds = extrasSeleccionados[producto.id] || [];
    const precioExtras = extrasIds.reduce((acc, id) => {
      const extra = producto.extras.find(e => e.id === id);
      return acc + (extra ? extra.precio : 0);
    }, 0);
    const productoParaCarrito = {
      id: producto.id + '-' + extrasIds.sort().join('-'),
      nombre: producto.nombre,
      precio: producto.precio + precioExtras,
      cantidad: 1,
      imagen: producto.imagen,
      extras: extrasIds.map(id => {
        const extra = producto.extras.find(e => e.id === id);
        return extra ? extra.label : '';
      }).filter(Boolean)
    };
    agregarAlCarrito(productoParaCarrito);
    setExtrasSeleccionados(prev => ({ ...prev, [producto.id]: [] }));
    setSidebarAbierto(true);
  };

  // Agregar producto desde el modal de detalles
  const handleAgregarDesdeModal = () => {
    if (!modalDetalles.producto) return;
    const producto = modalDetalles.producto;
    const extrasIds = extrasModalSeleccionados;
    const precioExtras = extrasIds.reduce((acc, id) => {
      const extra = producto.extras.find(e => e.id === id);
      return acc + (extra ? extra.precio : 0);
    }, 0);
    const productoParaCarrito = {
      id: producto.id + '-' + extrasIds.sort().join('-'),
      nombre: producto.nombre,
      precio: producto.precio + precioExtras,
      cantidad: 1,
      imagen: producto.imagen,
      extras: extrasIds.map(id => {
        const extra = producto.extras.find(e => e.id === id);
        return extra ? extra.label : '';
      }).filter(Boolean)
    };
    agregarAlCarrito(productoParaCarrito);
    setExtrasModalSeleccionados([]);
    setModalDetalles({ abierto: false, producto: null });
    setSidebarAbierto(true);
  };

  // Calcular total del carrito
  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Confirmar pedido
  const handleConfirmarPedido = () => {
    if (!nombreCliente || !telefonoCliente || !direccionSeleccionada) return;
    const direccionObj = direcciones.find(d => d.id === direccionSeleccionada);
    crearPedido({
      id: Date.now(),
      cliente: nombreCliente,
      telefono: telefonoCliente,
      direccion: direccionObj,
      items: carrito,
      total: totalCarrito,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente'
    });
    setAnimacion(true);
    setTimeout(() => {
      setAnimacion(false);
      limpiarCarrito();
      setNombreCliente('');
      setTelefonoCliente('');
      setDireccionSeleccionada('');
    }, 2500);
  };

  // Modal flotante para nueva dirección
  const [modalDireccion, setModalDireccion] = useState(false);

  // Guardar nueva dirección (ahora desde modal)
  const handleGuardarDireccion = () => {
    if (!nuevaDireccion.calle || !nuevaDireccion.ciudad || !nuevaDireccion.barrio) return;
    const nueva = {
      ...nuevaDireccion,
      id: Date.now().toString()
    };
    agregarDireccion(nueva);
    setDireccionSeleccionada(nueva.id);
    setNuevaDireccion({ ciudad: '', calle: '', barrio: '' });
    setModalDireccion(false);
  };

  // Responsive: mostrar sidebar como modal en móvil
  const isMobile = window.innerWidth < 900;

  return (
    <div className="catalogo-productos-dark" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingTop: 70,
      height: 'calc(100vh - 70px)',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Barra de búsqueda flotante */}
      {buscadorVisible && (
        <div style={{
          position: 'fixed',
          top: 70,
          left: 0,
          width: '100vw',
          background: '#23272f',
          zIndex: 4000,
          boxShadow: '0 2px 12px #0006',
          padding: '18px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <input
            type="text"
            placeholder="Buscar producto o restaurante..."
            value={busquedaGlobal}
            onChange={e => setBusquedaGlobal(e.target.value)}
            aria-label="Buscar producto o restaurante"
            style={{
              background: '#181c22',
              border: 'none',
              color: '#fff',
              fontSize: '1.1rem',
              padding: '14px 18px',
              borderRadius: 8,
              width: '100%',
              maxWidth: 420,
              boxShadow: '0 2px 8px #0002',
              outline: 'none',
              margin: '0 auto',
              display: 'block',
            }}
            autoFocus
          />
          <button
            onClick={() => setBuscadorVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              marginLeft: 18,
              cursor: 'pointer',
              fontWeight: 700
            }}
            aria-label="Cerrar búsqueda"
          >×</button>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%', overflow: 'auto', scrollbarWidth: 'none' }}
        className="catalogo-scroll-hide"
      >
        <h2 style={{
          color: '#ffb84d',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '1.7rem',
          margin: '0 0 10px 0',
          letterSpacing: 0.5,
          paddingTop: 8,
          textShadow: '0 2px 8px #0006'
        }}>Catálogo de productos</h2>
        <div className="catalogo-lista-productos" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 14,
          maxWidth: 1100,
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
                  <button className="btn-detalles" style={{ flex: 1, background: '#232323', color: '#ffb84d', border: '1.5px solid #ffb84d', borderRadius: 8, fontWeight: 700, fontSize: 14, padding: '8px 0', cursor: 'pointer', transition: 'all 0.18s' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#ffb84d'; e.currentTarget.style.color = '#232323'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#232323'; e.currentTarget.style.color = '#ffb84d'; }}
                    onClick={() => { setModalDetalles({ abierto: true, producto }); setExtrasModalSeleccionados([]); }}>
                    Detalles
                  </button>
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
      </div>

      {/* Panel lateral del carrito */}
      {((carrito.length > 0 && sidebarAbierto) || (sidebarAbierto && carrito.length > 0) || (!isMobile && carrito.length > 0 && sidebarAbierto)) && (
        <div className={`sidebar-carrito${isMobile ? ' sidebar-modal' : ''}`}
          style={{
            right: 0,
            top: 0,
            height: '100vh',
            position: isMobile ? 'fixed' : 'sticky',
            zIndex: 3000,
            paddingTop: 70,
            minWidth: isMobile ? '100vw' : 340,
            maxWidth: 420,
            background: '#23272f',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            borderLeft: '2px solid #181c22',
            scrollbarWidth: 'none',
          }}>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 6, marginBottom: 18, paddingRight: 6, minHeight: 60, scrollbarWidth: 'none' }}
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

            {/* Modal flotante para nueva dirección */}
            {modalDireccion && (
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
                  <div style={{display:'flex',gap:16,marginTop:8, justifyContent:'center'}}>
                    <button className="btn-finalizar" style={{flex:'1 1 0', maxWidth:170, fontSize: '1.08rem', padding: '12px 0'}} onClick={handleGuardarDireccion}>
                      Guardar dirección
                    </button>
                    <button className="btn-quitar" style={{flex:'1 1 0', maxWidth:170, fontSize: '1.08rem', padding: '12px 0'}} onClick={()=>setModalDireccion(false)}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de detalles del producto */}
      {modalDetalles.abierto && modalDetalles.producto && (
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
            <img src={modalDetalles.producto.imagen} alt={modalDetalles.producto.nombre} style={{ width: 120, height: 120, borderRadius: 18, objectFit: 'cover', marginBottom: 8, boxShadow: '0 2px 12px #0004' }} />
            <h3 style={{ color: '#ffb84d', fontWeight: 700, fontSize: '1.25rem', textAlign: 'center', marginBottom: 2 }}>{modalDetalles.producto.nombre}</h3>
            <span style={{ color: '#ffb84d', fontWeight: 700, fontSize: 18 }}>{formatearPrecio(modalDetalles.producto.precio)}</span>
            <span style={{ color: '#bfc9d1', fontSize: 15, marginBottom: 6 }}>{modalDetalles.producto.restaurante}</span>
            <p style={{ color: '#6ec1ff', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>{modalDetalles.producto.descripcion}</p>
            {modalDetalles.producto.extras.length > 0 && (
              <div style={{ width: '100%', marginBottom: 10 }}>
                <span style={{ color: '#ffb84d', fontWeight: 500, fontSize: 14 }}>Extras para añadir:</span>
                {modalDetalles.producto.extras.map(extra => (
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
      )}
    </div>
  );
}

/* Ocultar scrollbars en todo el catálogo y panel lateral */
<style>
{`
.catalogo-scroll-hide {
  scrollbar-width: none !important;
}
.catalogo-scroll-hide::-webkit-scrollbar {
  display: none !important;
}
`}
</style>
