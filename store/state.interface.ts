import * as MeTypes from './me/types';

export interface State {
  [MeTypes.NAMESPACE]: MeTypes.State;
}
