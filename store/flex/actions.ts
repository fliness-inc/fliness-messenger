import { MenuStateEnum } from './state';

export default {
  updateMenuState({ commit, state }) {
    if (
      window.innerWidth >= 1024 &&
      state.menuState !== MenuStateEnum.MOVING_DEACTIVE
    ) {
      commit('updateMenuState', MenuStateEnum.MOVING_ACTIVE);
    } else if (window.innerWidth < 1024 && window.innerWidth > 720) {
      commit('updateMenuState', MenuStateEnum.MOVING_OVER_DEACTIVE);
    } else if (window.innerWidth < 720) {
      commit(
        'updateMenuState',
        MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE
      );
    }
  },
  changeMenuState({ commit, state }) {
    switch (state.menuState) {
      case MenuStateEnum.MOVING_ACTIVE:
        commit('updateMenuState', MenuStateEnum.MOVING_DEACTIVE);
        break;
      case MenuStateEnum.MOVING_DEACTIVE:
        commit('updateMenuState', MenuStateEnum.MOVING_ACTIVE);
        break;
      case MenuStateEnum.MOVING_OVER_ACTIVE:
        commit('updateMenuState', MenuStateEnum.MOVING_OVER_DEACTIVE);
        break;
      case MenuStateEnum.MOVING_OVER_DEACTIVE:
        commit('updateMenuState', MenuStateEnum.MOVING_OVER_ACTIVE);
        break;
      case MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE:
        commit(
          'updateMenuState',
          MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE
        );
        break;
      case MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE:
        commit(
          'updateMenuState',
          MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE
        );
        break;
    }
  },
};
