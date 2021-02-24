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
        headers: {
          Cookie: `jwt-token=${token}`,
          'User-Agent': userAgent,
        },
      }
    )
    .then(({ data: { data } }) => {
      app.$cookies.set('jwt-token', data.refreshToken);
      redirect('/dialogs');
    })
    .catch(() => redirect('/sign-in'));
};
