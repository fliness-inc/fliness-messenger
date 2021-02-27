import { SET_USERS_MUTATION_NAME } from './types';

export default {
  [SET_USERS_MUTATION_NAME](state, payload) {
    let newUsers = payload;
    const allUsers = state.all;

    allUsers.map((existingUser) => {
      const foundUser = newUsers.find(
        (newUser) => newUser.id === existingUser.id
      );

      if (foundUser) {
        newUsers = newUsers.filter((newUser) => newUser.id !== existingUser.id);
        return {
          ...existingUser,
          ...foundUser,
        };
      }

      return existingUser;
    });

    state.all = [...allUsers, ...newUsers];
  },
};
