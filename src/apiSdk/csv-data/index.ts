import axios from 'axios';
import queryString from 'query-string';
import { CsvDataInterface, CsvDataGetQueryInterface } from 'interfaces/csv-data';
import { GetQueryInterface } from '../../interfaces';

export const getCsvData = async (query?: CsvDataGetQueryInterface) => {
  const response = await axios.get(`/api/csv-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCsvData = async (csvData: CsvDataInterface) => {
  const response = await axios.post('/api/csv-data', csvData);
  return response.data;
};

export const updateCsvDataById = async (id: string, csvData: CsvDataInterface) => {
  const response = await axios.put(`/api/csv-data/${id}`, csvData);
  return response.data;
};

export const getCsvDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/csv-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCsvDataById = async (id: string) => {
  const response = await axios.delete(`/api/csv-data/${id}`);
  return response.data;
};
