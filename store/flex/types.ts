export enum MenuStateEnum {
  NONE = 'NONE',
  ACTIVE = 'ACTIVE',
}

export interface State {
  menuState: MenuStateEnum;
}

export const NAMESPACE = 'flex';

export namespace Mutations {
  export namespace Types {
    export const SET_MENU_STATE = 'SET_MENU_STATE';
  }
}

export namespace Actions {
  export namespace Types {
    export const CHANGE_MENU_STATE = 'CHANGE_MENU_STATE';
    export const SET_MENU_STATE = 'SET_MENU_STATE';
  }

  export const CHANGE_MENU_STATE = `${NAMESPACE}/${Types.CHANGE_MENU_STATE}`;
  export const SET_MENU_STATE = `${NAMESPACE}/${Types.SET_MENU_STATE}`;
}
