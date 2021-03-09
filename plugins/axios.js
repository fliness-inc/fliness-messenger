export default ({ $axios, store }) => {
  $axios.defaults.baseURL = process.env.NUXT_ENV_API_HTTP_URL;
  $axios.defaults.withCredentials = true;

  $axios.interceptors.request.use((req) => ({
    ...req,
    headers: {
      ...req.headers,
      Authorization: `Bearer ${store.state.auth.tokens.access}`,
    },
  }));

  $axios.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );
};
