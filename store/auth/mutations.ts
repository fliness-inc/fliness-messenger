export default {
  setTokens(state, payload) {
    state.tokens = {
      access: payload.accessToken,
      refresh: payload.refreshToken,
    };
  },
};
