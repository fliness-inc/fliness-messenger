import { makeVar } from '@apollo/client';

export enum PageTypeEnum {
  DIALOGS = 'DIALOGS',
  DIALOG = 'DIALOG',
  GROUPS = 'GROUPS',
  CHANNELS = 'CHANNELS',
  SETTINGS = 'SETTINGS',
}

export const currentPageVar = makeVar(PageTypeEnum.DIALOGS);
