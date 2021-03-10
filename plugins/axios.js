import * as AuthActions from '~/store/auth/actions';

export default ({ $cookies, $axios, store }) => {
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
      if (error.response.status !== 401) return Promise.reject(error);

      const token = $cookies.get('jwt-token');
      const userAgent = process.server
        ? error.request.headers['user-agent']
        : navigator.userAgent;

      return fetch('http://localhost:8080/v1/api/auth/refresh-tokens', {
        method: 'POST',
        headers: {
          Cookie: `jwt-token=${token}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((data) => data.json())
        .then(({ data }) => {
          $cookies.set('jwt-token', data.refreshToken);
          store.dispatch(AuthActions.SET_TOKENS, {
            tokens: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
          });
        });
    },
  );
};
