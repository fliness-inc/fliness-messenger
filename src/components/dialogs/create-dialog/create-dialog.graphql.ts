import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me {
      id
    }
  }
`;

export const GET_USERS = gql`
  query($filter: UsersFilter!) {
    users(filter: $filter) {
      edges {
        node {
          id
          name
          avatarURL
        }
      }
    }
  }
`;

export const GET_FRIENDS = gql`
  query($filter: FriendsFilter!) {
    me {
      id
      friends(filter: $filter) {
        edges {
          node {
            id
            name
            avatarURL
          }
        }
      }
    }
  }
`;

export const CREATE_DIALOG = gql`
  mutation($payload: ChatCreateDTO!) {
    me {
      chats {
        create(payload: $payload) {
          id
          members {
            edges {
              node {
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
`;
