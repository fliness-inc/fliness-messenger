import * as NetworkStatus from '../network-status';
import * as Themes from './themes';

export default () => ({
  id: null,
  status: NetworkStatus.NONE,
  theme: Themes.LIGHT,
});
