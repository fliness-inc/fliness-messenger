import { SET_ME_INFO_MUTATION_NAME } from './types';

export default {
  [SET_ME_INFO_MUTATION_NAME](state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.email = payload.email;
    state.avatarURL = payload.avatarURL;
  },
};
