import { State } from './state.interface';

export const getters = {
  currentChat: (state: State) =>
    state.chats.all.find((chat) => chat.id === state.chats.currentChatId),
};

export default getters;
