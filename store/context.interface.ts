export interface Context<S = any, RS = any> {
  [key: string]: any;
  state: S;
  rootState: RS;
}
