import React, { useEffect, useState } from 'react';
import { createPhoto, deletePhoto, getPhotos, updatePhoto } from '../../services/photoService';
import '../../styles/productoCrud.css';

export default function CrudInconvenientes() {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({ caption: '', issue_id: 1 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handleCreatePhoto = async () => {
    if (!newPhoto.caption) return;

    try {
      const newPhotoData = await createPhoto(newPhoto);
      setPhotos([...photos, newPhotoData]);
      setNewPhoto({ caption: '', issue_id: 1 });
      setMessage('Inconveniente registrado con éxito.');
    } catch (error) {
      console.error('Error creating photo:', error);
      setMessage('Error al registrar el inconveniente.');
    }
  };

  const handleUpdatePhoto = async (id, photoData) => {
    try {
      const updatedPhoto = await updatePhoto(id, photoData);
      setPhotos(photos.map(photo => (photo.id === id ? updatedPhoto : photo)));
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await deletePhoto(id);
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div className="catalogo-productos-dark">
      <h1>CRUD de Inconvenientes</h1>
      <div>
        <h2>Registrar Inconveniente</h2>
        <input
          type="text"
          placeholder="Descripción del inconveniente"
          value={newPhoto.caption}
          onChange={e => setNewPhoto({ ...newPhoto, caption: e.target.value })}
        />
        <button onClick={handleCreatePhoto}>Registrar</button>
        {message && <p>{message}</p>}
      </div>
      <div>
        <h2>Revisar Inconvenientes</h2>
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <p>{photo.caption}</p>
              <button onClick={() => handleUpdatePhoto(photo.id, { caption: 'Updated Caption' })}>Actualizar</button>
              <button onClick={() => handleDeletePhoto(photo.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 