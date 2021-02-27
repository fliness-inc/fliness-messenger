import { SET_TOKENS_MUTATION_NAME } from './types';

export default {
  [SET_TOKENS_MUTATION_NAME](state, payload) {
    state.tokens = {
      access: payload.accessToken,
      refresh: payload.refreshToken,
    };
  },
};
