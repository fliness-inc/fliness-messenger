import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation($payload: AuthRegisterDTO!) {
        auth {
            register(payload: $payload) {
                accessToken
                refreshToken
            }
        }
    }
`;