export const NAMESPACE = 'chats';

export const CREATE_CHAT_MUTATION_NAME = 'createChat';
export const GET_CHATS_MUTATION_NAME = 'getChats';
export const SET_CHAT_TYPES_MUTATION_NAME = 'setChatTypes';

export const CREATE_CHAT_ACTION_NAME = 'createChat';
export const GET_CHATS_ACTION_NAME = 'getChats';
export const GET_CHAT_TYPES_ACTION_NAME = 'getChatTypes';

export const CREATE_CHAT_ACTION = `${NAMESPACE}/${CREATE_CHAT_ACTION_NAME}`;
export const GET_CHATS_ACTION = `${NAMESPACE}/${GET_CHATS_ACTION_NAME}`;
export const GET_CHAT_TYPES_ACTION = `${NAMESPACE}/${GET_CHAT_TYPES_ACTION_NAME}`;
