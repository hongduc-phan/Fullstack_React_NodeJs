import gql from "graphql-tag";

export const RESET_PASSWORD = gql`
  mutation($email: String!) {
    resetPassword(email: $email)
  }
`;

export const CHECK_RESET_ID = gql`
  mutation($resetId: String!) {
    checkResetID(resetId: $resetId)
  }
`;

export const SET_NEW_PASSWORD = gql`
  mutation($resetId: String!, $password: String!) {
    setNewPassword(resetId: $resetId, password: $password)
  }
`;
