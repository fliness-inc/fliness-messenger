export enum Pages {
  DIALOGS = 'DIALOGS',
  DIALOG = 'DIALOG',
  GROUPS = 'GROUPS',
  GROUP = 'GROUP',
  CHANNELS = 'CHANNELS',
  CHANNEL = 'CHANNEL',
  SETTINGS = 'SETTINGS',
}

export interface State {
  currentPage: Pages | null;
}

export interface SetPageMutationPayload {
  page: Pages | null;
}

export interface SetPageActionPayload extends SetPageMutationPayload {}

export const NAMESPACE = 'pages';

export namespace MutationTypes {
  export const SET_PAGE = 'SET_PAGE';
}

export namespace ActionTypes {
  export const SET_PAGE = 'SET_PAGE';
}

export namespace Actions {
  export const SET_PAGE = `${NAMESPACE}/${ActionTypes.SET_PAGE}`;
}
