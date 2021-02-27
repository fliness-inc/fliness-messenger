import { SET_CHATS_MEMBERS_MUTATION_NAME } from './types';

export default {
  [SET_CHATS_MEMBERS_MUTATION_NAME](state, payload) {
    let newMembers = payload;
    const allMembers = state.all;

    allMembers.map((existingMember) => {
      const foundMember = newMembers.find(
        (newMember) => newMember.id === existingMember.id
      );

      if (foundMember) {
        newMembers = newMembers.filter(
          (newMember) => newMember.id !== existingMember.id
        );
        return {
          ...existingMember,
          ...foundMember,
        };
      }

      return existingMember;
    });

    state.all = [...allMembers, ...newMembers];
  },
};
