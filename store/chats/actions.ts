import {
  GET_CHATS_ACTION_NAME,
  CREATE_CHAT_ACTION_NAME,
  GET_CHATS_MUTATION_NAME,
  CREATE_CHAT_MUTATION_NAME,
} from './types';
import axios from '~/plugins/axios';

export default {
  [GET_CHATS_ACTION_NAME]({ commit, rootState }) {
    return axios
      .get('/me/chats', {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => commit(GET_CHATS_MUTATION_NAME, data))
      .catch((e) => console.error(e));
  },
  [CREATE_CHAT_ACTION_NAME]({ commit, rootState }, payload) {
    return axios
      .post('/chats', payload, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => commit(CREATE_CHAT_MUTATION_NAME, data))
      .catch((e) => console.error(e));
  },
};
