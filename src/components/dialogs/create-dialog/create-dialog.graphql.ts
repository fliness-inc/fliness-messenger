import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query {
        users {
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
    query {
        me {
            friends {
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