import Vue from 'vue';
import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_USERS](state, { users }) {
    users.forEach((user) => {
      Vue.set(state.all, user.id, user);
    });
  },
};
