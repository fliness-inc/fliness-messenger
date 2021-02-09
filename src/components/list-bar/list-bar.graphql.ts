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
  query($filter: ChatsFilter!) {
    me {
      id
      chats(filter: $filter) {
        edges {
          node {
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
