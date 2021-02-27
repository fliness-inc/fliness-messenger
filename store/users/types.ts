export const NAMESPACE = 'users';

/* Mutations */
export const SET_USERS_MUTATION_NAME = 'setUsers';

/* Actions names */
export const GET_USERS_ACTION_NAME = 'getUsers';
export const GET_USERS_BY_IDS_ACTION_NAME = 'getUsersByIds';

/* Actions */
export const GET_USERS_ACTION = `${NAMESPACE}/${GET_USERS_ACTION_NAME}`;
export const GET_USERS_BY_IDS_ACTION = `${NAMESPACE}/${GET_USERS_BY_IDS_ACTION_NAME}`;
