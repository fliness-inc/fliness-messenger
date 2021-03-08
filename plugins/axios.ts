import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NUXT_ENV_API_HTTP_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default instance;
