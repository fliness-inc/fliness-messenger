import { State, MenuStateEnum } from './types';

export default (): State => ({
  menuState: MenuStateEnum.NONE,
});
