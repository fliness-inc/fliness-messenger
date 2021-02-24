import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    me {
      id
      name
      avatarURL
    }
  }
`;

export const GET_CURRENT_CHAT = gql`
  query($chatFilter: ChatsFilter!, $memberFilter: MembersFilter!) {
    me {
      chats(filter: $chatFilter) {
        edges {
          node {
            id
            members(filter: $memberFilter) {
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
          }
        }
      }
    }
  }
`;
