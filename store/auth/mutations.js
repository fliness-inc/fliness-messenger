import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_TOKENS](state, { tokens }) {
    state.tokens = {
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    };
  },
  [MutationTypes.SET_STATUS](state, payload) {
    state.status = payload.status;
  },
};
