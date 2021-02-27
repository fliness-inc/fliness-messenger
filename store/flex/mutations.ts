import { SET_MENU_STATE_MUTATION_NAME } from './types';
import { MenuStateEnum } from './state';

export default {
  [SET_MENU_STATE_MUTATION_NAME](state, payload: MenuStateEnum) {
    state.menuState = payload;
  },
};
