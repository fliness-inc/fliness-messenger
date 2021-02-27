import { GET_ME_INFO_ACTION_NAME, SET_ME_INFO_MUTATION_NAME } from './types';
import axios from '~/plugins/axios';

export default {
  [GET_ME_INFO_ACTION_NAME]({ commit, rootState }) {
    return axios
      .get('/me', {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => {
        commit(SET_ME_INFO_MUTATION_NAME, {
          id: data.id,
          name: data.name,
          email: data.email,
          avatarURL: data.avatarURL,
        });
      })
      .catch((e) => e);
  },
};
