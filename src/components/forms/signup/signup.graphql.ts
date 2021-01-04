import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($payload: AuthLoginDTO!) {
        auth {
            login(payload: $payload) {
                accessToken
                refreshToken
            }
        }
    }
`;