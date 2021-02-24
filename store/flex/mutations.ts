import { MenuStateEnum } from './state';

export default {
  updateMenuState(state, payload: MenuStateEnum) {
    state.menuState = payload;
  },
};
