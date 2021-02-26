import axios from '~/plugins/axios';

export default {
  getUsers({ commit }) {
    return axios
      .get('/users')
      .then(({ data: { data } }) => commit('setUsers', { users: data }))
      .catch((e) => console.error(e));
  },
};
