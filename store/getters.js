export const getters = {
  currentChat: (state) => state.chats.all[state.chats.currentChatId] || {},
  me: (state) => state.users.all[state.me.id] || {},
};

export default getters;
