import { SET_MENU_STATE_MUTATION_NAME, MenuStateEnum } from './types';

export default {
  [SET_MENU_STATE_MUTATION_NAME](state, payload: MenuStateEnum) {
    state.menuState = payload;
  },
};
