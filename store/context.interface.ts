import { Store } from 'vuex/types/index';

export interface Context<S = any, RS = any> {
  [key: string]: any;
  store: S;
  rootStore: RS;
}
