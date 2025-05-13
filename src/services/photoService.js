import axios from 'axios';

const API_URL = 'http://localhost:5000/api/photos';

export const getPhotos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const createPhoto = async (photoData) => {
  try {
    const response = await axios.post(API_URL, photoData);
    return response.data;
  } catch (error) {
    console.error('Error creating photo:', error);
    throw error;
  }
};

export const updatePhoto = async (id, photoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, photoData);
    return response.data;
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
};

export const deletePhoto = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
}; 