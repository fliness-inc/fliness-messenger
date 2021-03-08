export interface User {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

export interface State {
  all: User[];
}

export const NAMESPACE = 'users';

export namespace Mutations {
  export namespace Types {
    export const SET_USERS = 'SET_USERS';
  }

  export interface SetUsersPayload {
    users: User[];
  }
}

export namespace Actions {
  export namespace Types {
    export const GET_USERS = 'SET_USERS';
    export const GET_USERS_BY_IDS = 'GET_USERS_BY_IDS';
  }

  export interface SetUsersByIdsPayload {
    ids: string[];
  }

  export const GET_USERS = `${NAMESPACE}/${Types.GET_USERS}`;
  export const GET_USERS_BY_IDS = `${NAMESPACE}/${Types.GET_USERS_BY_IDS}`;
}
