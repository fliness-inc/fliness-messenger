import { gql } from '@apollo/client';

export const GET_CURRENT_CHAT = gql`
  query {
    localState @client {
      currentChat
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation($payload: MessageCreateDTO!) {
    me {
      chats {
        messages {
          create(payload: $payload) {
            id
          }
        }
      }
    }
  }
`;
