import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from './auth';
import FlexModule from './flex';
import MeModule from './me';

Vue.use(Vuex);

export const modules = {
  auth: AuthModule,
  flex: FlexModule,
  me: MeModule,
};
