import { makeVar } from '@apollo/client';

export enum Pages {
    DIALOGS = 'DIALOGS',
    GROUPS = 'GROUPS',
    CHANNELS = 'CHANNELS',
    SETTINGS = 'SETTINGS'
}

export const currentPage = makeVar(Pages.DIALOGS);