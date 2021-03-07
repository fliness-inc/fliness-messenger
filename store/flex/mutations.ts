import { Mutations, MenuStateEnum } from './types';

export default {
  [Mutations.Types.SET_MENU_STATE](state, payload: { state: MenuStateEnum }) {
    state.menuState = payload.state;
  },
};
