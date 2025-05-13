export function formatearPrecio(valor) {
  if (valor === undefined || valor === null) {
    return '';
  }
  return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
} 