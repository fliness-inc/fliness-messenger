export interface State {
  id: string | null;
  name: string | null;
  email: string | null;
  avatarURL: string | null;
}

export interface SetMeInfoMutationPayload {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

export const NAMESPACE = 'me';

/* Mutations names */
export namespace MutationTypes {
  export const SET_ME_INFO = 'SET_ME_INFO';
}

export namespace ActionTypes {
  export const GET_ME_INFO = 'GET_ME_INFO';
}

export namespace Actions {
  export const GET_ME_INFO = `${NAMESPACE}/${ActionTypes.GET_ME_INFO}`;
}
