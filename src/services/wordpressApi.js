import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.luzdoentardecer.org/wp-json/wp/v2/',
});

export default api;
