import * as AuthActions from '~/store/auth/actions';
/* import axios from '~/plugins/axios'; */

export default ({ app, redirect, req }) => {
  const token = app.$cookies.get('jwt-token');
  const userAgent = process.server
    ? req.headers['user-agent']
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
      app.$cookies.set('jwt-token', data.refreshToken);
      app.store.dispatch(AuthActions.SET_TOKENS, {
        tokens: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      });
    })
    .catch(() => redirect('/sign-in'));

  /* return axios
    .post(
      '/auth/refresh-tokens',
      {},
      {
        headers: {
          Cookie: `jwt-token=${token}`,
          'User-Agent': userAgent,
        },
      }
    )
    .then(({ data: { data } }) => {
      app.$cookies.set('jwt-token', data.refreshToken);
      app.store.dispatch(SET_TOKENS_ACTION, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    })
    .catch(() => redirect('/sign-in')); */
};
