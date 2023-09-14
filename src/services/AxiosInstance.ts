import axios from 'axios';
import { getBaseUrl } from '../AppSettings';

const AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

export default AxiosInstance;

const username = 'self770448771';
const password = 'cjb01upnghuj1qaqhousr8hd5e';

// Create a base64 encoded string of the username and password
const basicAuthCredentials = btoa(`${username}:${password}`);

// Define the API endpoint
const apiUrl = 'https://xecdapi.xe.com/v1/currencies';

// Create an axios instance with the authentication headers
 export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Authorization': `Basic ${basicAuthCredentials}`,
    'Content-Type': 'application/json', // Set content type if neededx
  },
});