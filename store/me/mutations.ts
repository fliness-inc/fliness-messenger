import { MutationTypes } from './types';
import { Mutations } from './mutation.interface';

export const mutations: Mutations = {
  [MutationTypes.SET_ME_INFO](state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.email = payload.email;
    state.avatarURL = payload.avatarURL;
  },
};

export default mutations;
