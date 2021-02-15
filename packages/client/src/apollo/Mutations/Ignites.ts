import gql from "graphql-tag";

export const ASSIGN_IGNITES = gql`
  mutation assignIgnites($sparkId: String!, $ignitesIds: [String!]!) {
    assignIgnites(input: { sparkId: $sparkId, ignitesIds: $ignitesIds }) {
      igniteId
      memberId
    }
  }
`;
