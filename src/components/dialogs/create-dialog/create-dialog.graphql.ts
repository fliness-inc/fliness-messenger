import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query {
        users {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_FRIENDS = gql`
    query {
        me {
            friends {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`;