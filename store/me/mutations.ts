export default {
  setMeInfo(state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.email = payload.email;
    state.avatarURL = payload.avatarURL;
  },
};
