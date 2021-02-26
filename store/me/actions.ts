import axios from '~/plugins/axios';

export default {
  getMeInfo({ commit, rootState }) {
    return axios
      .get('/me', {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => {
        commit('setMeInfo', {
          id: data.id,
          name: data.name,
          email: data.email,
          avatarURL: data.avatarURL,
        });
      })
      .catch((e) => e);
  },
};
