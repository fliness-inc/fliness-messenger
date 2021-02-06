import { makeVar } from '@apollo/client';

export enum MenuStateEnum {
  NONE = 'NONE',
  MOVING_ACTIVE = 'MOVING_ACTIVE',
  MOVING_DEACTIVE = 'MOVING_DEACTIVE',
  MOVING_ON_TOP_ACTIVE = 'MOVING_ON_TOP_ACTIVE',
  MOVING_ON_TOP_DEACTIVE = 'MOVING_ON_TOP_DEACTIVE',
  MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE = 'MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE',
  MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE = 'MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE',
}

export const menuStateVar = makeVar<MenuStateEnum>(MenuStateEnum.NONE);
