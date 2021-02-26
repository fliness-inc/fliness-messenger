import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from './auth';
import FlexModule from './flex';
import MeModule from './me';
import ChatsModule from './chats';
import UsersModule from './users';

Vue.use(Vuex);

export const modules = {
  auth: AuthModule,
  flex: FlexModule,
  me: MeModule,
  chats: ChatsModule,
  users: UsersModule,
};
