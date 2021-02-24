export default {
  setMeInfo(state, payload) {
    state = {
      ...state,
      id: payload.id,
      email: payload.email,
      name: payload.name,
      avatarURL: payload.avatarURL,
    };
  },
};
