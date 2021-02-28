import { State } from './types';

export default (): State => ({
  tokens: {
    access: null,
    refresh: null,
  },
});
