import { gql } from '@apollo/client';

export const GET_LOCAL_STATE = gql`
  query {
    localState @client {
      menuState
      currentChat
    }
  }
`;

export const GET_DIALOGS = gql`
  query($filter: ChatsFilter!, $pagination: MessagePaginationInput!) {
    me {
      id
      chats(filter: $filter) {
        edges {
          node {
            id
            numUnreaded
            members {
              edges {
                node {
                  id
                  user {
                    id
                    name
                    avatarURL
                  }
                }
              }
            }
            messages(pagination: $pagination) {
              edges {
                node {
                  id
                  text
                  createdAt
                  member {
                    user {
                      id
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

export const SUBS_CHAT_ADDED = gql`
  subscription {
    CHAT_CREATED_EVENT {
      id
      members {
        edges {
          node {
            id
            user {
              id
              name
              avatarURL
            }
          }
        }
      }
      messages {
        edges {
          node {
            id
            text
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

export const GET_NUM_NOT_VIEWED = gql`
  query($filter: ChatsFilter!) {
    me {
      chats(filter: $filter) {
        edges {
          node {
            id
            numUnreaded
          }
        }
      }
    }
  }
`;
