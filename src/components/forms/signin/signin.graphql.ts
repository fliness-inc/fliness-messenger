import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation($payload: AuthLoginDTO!) {
    auth {
      login(payload: $payload) {
        accessToken
        refreshToken
      }
    }
  }
`;
