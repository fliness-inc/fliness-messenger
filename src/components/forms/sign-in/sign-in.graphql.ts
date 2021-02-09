import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation($payload: AuthSignInDTO!) {
    auth {
      signIn(payload: $payload) {
        accessToken
        refreshToken
      }
    }
  }
`;
