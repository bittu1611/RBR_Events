import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const postContact = (data) => axios.post(`${API_BASE}/api/contacts`, data);
export const getContacts = (adminPass) => axios.get(`${API_BASE}/api/contacts`, { params: { adminPass }});
export const uploadImage = (formData) => axios.post(`${API_BASE}/api/uploads`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});





const BASE = "http://localhost:5000/api";

// Gallery (new)
export const getGalleryImages = () => axios.get(`${BASE}/gallery`);
export const uploadGalleryImage = (formData) =>
  axios.post(`${BASE}/gallery/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteGalleryImage = (id) => axios.delete(`${BASE}/gallery/${id}`);
