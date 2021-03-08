import { MutationTypes } from './types';
import { Mutations } from './mutation.interface';

export const mutations: Mutations = {
  [MutationTypes.SET_ME_INFO](state, payload) {
    state.id = payload.id;
  },
};

export default mutations;
