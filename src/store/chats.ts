import { makeVar } from '@apollo/client';

export const currentChatVar = makeVar<string | null>(null);
