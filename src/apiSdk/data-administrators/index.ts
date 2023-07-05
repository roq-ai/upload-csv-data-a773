import axios from 'axios';
import queryString from 'query-string';
import { DataAdministratorInterface, DataAdministratorGetQueryInterface } from 'interfaces/data-administrator';
import { GetQueryInterface } from '../../interfaces';

export const getDataAdministrators = async (query?: DataAdministratorGetQueryInterface) => {
  const response = await axios.get(`/api/data-administrators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDataAdministrator = async (dataAdministrator: DataAdministratorInterface) => {
  const response = await axios.post('/api/data-administrators', dataAdministrator);
  return response.data;
};

export const updateDataAdministratorById = async (id: string, dataAdministrator: DataAdministratorInterface) => {
  const response = await axios.put(`/api/data-administrators/${id}`, dataAdministrator);
  return response.data;
};

export const getDataAdministratorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/data-administrators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDataAdministratorById = async (id: string) => {
  const response = await axios.delete(`/api/data-administrators/${id}`);
  return response.data;
};
