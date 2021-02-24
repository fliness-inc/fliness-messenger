import axios from '~/plugins/axios';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  name: string;
}

export default {
  signIn({ commit }, payload: SignInPayload) {
    return axios
      .post('/auth/sign-in', payload)
      .then(({ data: { data } }) => commit('setTokens', data))
      .catch((e) => {
        throw e.response.data;
      });
  },
  signUp({ commit }, payload: SignUpPayload) {
    return axios
      .post('/auth/sign-up', payload)
      .then(({ data: { data } }) => commit('setTokens', data))
      .catch((e) => {
        throw e.response.data;
      });
  },
};
