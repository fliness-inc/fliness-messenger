import { State } from './state.interface';

export const getters = {
  currentChat: (state: State) =>
    state.chats.all.find((chat) => chat.id === state.chats.currentChatId),

  me: (state: State) => state.users.all.find((user) => user.id === state.me.id),
};

export default getters;
