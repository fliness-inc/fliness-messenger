import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_MENU_STATE](state, payload) {
    state.menuState = payload.state;
  },
  [MutationTypes.SET_MENU_INFO_STATE](state, payload) {
    state.menuInfoState = payload.state;
  },
};
