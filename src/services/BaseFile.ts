
import { axiosInstance } from '../services/AxiosInstance';

export const fetchCurrencies = () => {
  return axiosInstance.get('/').then((response) => response.data.currencies);
};

export const convertCurrency = (fromCurrency: string, toCurrency: string, amount: string) => {
  const apiEndpoint = `https://xecdapi.xe.com/v1/convert_from/?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  return axiosInstance.get(apiEndpoint).then((response) => response.data.to[0].mid);
};

export const fetchHistoricRates = (fromCurrency:string, toCurrency:string) => {
  const apiEndpoint = `https://xecdapi.xe.com/v1/historic_rate/period/?from=${fromCurrency}&to=${toCurrency}&start_timestamp=2023-09-01&end_timestamp=2023-09-13&per_page=500`;
  return axiosInstance.get(apiEndpoint).then((response) => response.data.to[toCurrency]);
};
