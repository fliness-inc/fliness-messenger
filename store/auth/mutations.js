import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_TOKENS](state, { tokens }) {
    state.tokens = {
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    };
  },
  [MutationTypes.SET_STATUS](state, { status }) {
    state.status = status;
  },
  [MutationTypes.SET_ERROR](state, payload) {
    if (!payload) {
      state.error = null;
      return;
    }

    state.error = {
      type: payload.error,
      message: payload.message,
      statusCode: payload.payload,
    };
  },
};
