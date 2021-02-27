import { MenuStateEnum } from './state';
import {
  SET_MENU_STATE_MUTATION_NAME,
  UPDATE_MENU_STATE_ACTION_NAME,
  CHANGE_MENU_STATE_ACTION_NAME,
  SET_MENU_STATE_ACTION_NAME,
} from './types';

export default {
  [SET_MENU_STATE_ACTION_NAME]({ commit }, payload) {
    commit(SET_MENU_STATE_MUTATION_NAME, payload);
  },
  [UPDATE_MENU_STATE_ACTION_NAME]({ commit, state }) {
    if (
      window.innerWidth >= 1024 &&
      state.menuState !== MenuStateEnum.MOVING_DEACTIVE
    ) {
      commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_ACTIVE);
    } else if (window.innerWidth < 1024 && window.innerWidth > 720) {
      commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_OVER_DEACTIVE);
    } else if (window.innerWidth < 720) {
      commit(
        SET_MENU_STATE_MUTATION_NAME,
        MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE
      );
    }
  },
  [UPDATE_MENU_STATE_ACTION_NAME]({ commit, state }) {
    if (
      window.innerWidth >= 1024 &&
      state.menuState !== MenuStateEnum.MOVING_DEACTIVE
    ) {
      commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_ACTIVE);
    } else if (window.innerWidth < 1024 && window.innerWidth > 720) {
      commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_OVER_DEACTIVE);
    } else if (window.innerWidth < 720) {
      commit(
        SET_MENU_STATE_MUTATION_NAME,
        MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE
      );
    }
  },
  [CHANGE_MENU_STATE_ACTION_NAME]({ commit, state }) {
    switch (state.menuState) {
      case MenuStateEnum.MOVING_ACTIVE:
        commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_DEACTIVE);
        break;
      case MenuStateEnum.MOVING_DEACTIVE:
        commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_ACTIVE);
        break;
      case MenuStateEnum.MOVING_OVER_ACTIVE:
        commit(
          SET_MENU_STATE_MUTATION_NAME,
          MenuStateEnum.MOVING_OVER_DEACTIVE
        );
        break;
      case MenuStateEnum.MOVING_OVER_DEACTIVE:
        commit(SET_MENU_STATE_MUTATION_NAME, MenuStateEnum.MOVING_OVER_ACTIVE);
        break;
      case MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE:
        commit(
          SET_MENU_STATE_MUTATION_NAME,
          MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE
        );
        break;
      case MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE:
        commit(
          SET_MENU_STATE_MUTATION_NAME,
          MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE
        );
        break;
    }
  },
};
