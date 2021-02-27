import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule, { NAMESPACE as AUTH_NAMESPACE } from './auth';
import FlexModule, { NAMESPACE as FLEX_NAMESPACE } from './flex';
import MeModule, { NAMESPACE as ME_NAMESPACE } from './me';
import ChatsModule, { NAMESPACE as CHATS_NAMESPACE } from './chats';
import UsersModule, { NAMESPACE as USERS_NAMESPACE } from './users';

Vue.use(Vuex);

export const modules = {
  [AUTH_NAMESPACE]: AuthModule,
  [FLEX_NAMESPACE]: FlexModule,
  [ME_NAMESPACE]: MeModule,
  [CHATS_NAMESPACE]: ChatsModule,
  [USERS_NAMESPACE]: UsersModule,
};
