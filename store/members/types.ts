export interface Member {
  id: string;
  roleId: string;
  userId: string;
  chatId: string;
  updatedAt: string;
  createdAt: string;
}

export interface State {
  all: any[];
}

export const NAMESPACE = 'members';

/* Mutations names */
export const SET_CHATS_MEMBERS_MUTATION_NAME = 'setChatsMembers';

/* Actions names */
export const GET_CHATS_MEMBERS_ACTION_NAME = 'getChatsMembers';

/* Actions */
export const GET_CHATS_MEMBERS_ACTION = `${NAMESPACE}/${GET_CHATS_MEMBERS_ACTION_NAME}`;
