import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation($payload: AuthSignUpDTO!) {
    auth {
      signUp(payload: $payload) {
        accessToken
        refreshToken
      }
    }
  }
`;
