import { SET_TOKENS_ACTION } from '~/store/auth/types';
import axios from '~/plugins/axios';

export default ({ app, redirect, req }) => {
  const token = app.$cookies.get('jwt-token');
  const userAgent = process.server
    ? req.headers['user-agent']
    : navigator.userAgent;

  return axios
    .post(
      '/auth/refresh-tokens',
      {},
      {
        headers: process.server
          ? {
              Cookie: `jwt-token=${token}`,
              'User-Agent': userAgent,
            }
          : {},
      }
    )
    .then(({ data: { data } }) => {
      app.$cookies.set('jwt-token', data.refreshToken);
      app.store.dispatch(SET_TOKENS_ACTION, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    })
    .catch(() => redirect('/sign-in'));
};
