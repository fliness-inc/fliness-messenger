import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_MENU_STATE](state, payload) {
    state.menuState = payload.state;
  },
};
