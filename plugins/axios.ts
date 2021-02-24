import axios from 'axios';

export default axios.create({
  baseURL: process.env.NUXT_ENV_API_HTTP_URL,
  withCredentials: true,
});
