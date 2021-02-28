export interface State {
  tokens: {
    access: string | null;
    refresh: string | null;
  };
}

export const NAMESPACE = 'auth';

/* Mutations names */
export const SET_TOKENS_MUTATION_NAME = 'setTokens';

/* Actions names */
export const SIGN_IN_ACTION_NAME = 'signIn';
export const SIGN_UP_ACTION_NAME = 'signUn';
export const SET_TOKENS_ACTION_NAME = 'setTokens';

/* Actions */
export const SIGN_IN_ACTION = `${NAMESPACE}/${SIGN_IN_ACTION_NAME}`;
export const SIGN_UP_ACTION = `${NAMESPACE}/${SIGN_UP_ACTION_NAME}`;
export const SET_TOKENS_ACTION = `${NAMESPACE}/${SET_TOKENS_ACTION_NAME}`;
