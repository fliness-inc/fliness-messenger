import { makeVar } from '@apollo/client';

export enum Pages {
    CHATS = 'CHATS',
    GROUPS = 'GROUPS',
    CHANNELS = 'CHANNELS',
    SETTINGS = 'SETTINGS'
}

export const currentPage = makeVar(Pages.CHATS);