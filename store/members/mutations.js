import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_CHATS_MEMBERS](state, { members }) {
    let newMembers = members;
    const allMembers = state.all;

    allMembers.map((existingMember) => {
      const foundMember = newMembers.find(
        (newMember) => newMember.id === existingMember.id,
      );

      if (foundMember) {
        newMembers = newMembers.filter(
          (newMember) => newMember.id !== existingMember.id,
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
