import * as NetworkStatus from '../network-status';

export default () => ({
  tokens: {
    access: null,
    refresh: null,
  },
  state: NetworkStatus.NONE,
});
