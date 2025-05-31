// Exemple d'appel API pour les entreprises
import api from './axios';

export const getCompanies = async (token) => {
  const res = await api.get('/companies', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createCompany = async (data, token) => {
  const res = await api.post('/companies', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ... autres méthodes CRUD
