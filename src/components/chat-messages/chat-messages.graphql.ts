import { gql } from '@apollo/client';

export const GET_CURRENT_CHAT = gql`
  query {
    localState @client {
      currentChat
    }
  }
`;

export const GET_MESSAGES = gql`
  query(
    $filter: ChatsFilter!
    $pagination: MessagePaginationInput!
    $sort: Sort!
  ) {
    me {
      id
      name
      chats(filter: $filter) {
        edges {
          node {
            id
            messages(pagination: $pagination, sort: $sort) {
              edges {
                node {
                  id
                  text
                  createdAt
                  member {
                    id
                    user {
                      id
                      name
                      avatarURL
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MESSAGE_CREATED_SUBS = gql`
  subscription($chatId: UUID!) {
    MESSAGE_CREATED_EVENT(chatId: $chatId) {
      id
      text
      createdAt
      member {
        id
        user {
          id
          name
          avatarURL
        }
      }
    }
  }
`;
