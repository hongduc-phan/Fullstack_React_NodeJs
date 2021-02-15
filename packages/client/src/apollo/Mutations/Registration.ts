import gql from "graphql-tag";

export const SEND_VERIFICATION_CODE = gql`
  mutation($email: String!) {
    createEmailVerificationCode(email: $email)
  }
`;

export const VERIFY_CODE = gql`
  mutation($code: String!, $email: String!) {
    verifyCode(code: $code, email: $email)
  }
`;

export const CHECK_MEMBERNAME = gql`
  mutation($membername: String!, $email: String!) {
    checkMembername(membername: $membername, email: $email) {
      emailExists
      membernameExists
    }
  }
`;
