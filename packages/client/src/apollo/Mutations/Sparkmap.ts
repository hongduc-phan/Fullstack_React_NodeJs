import gql from "graphql-tag";

export const CREATE_EMPTY_SPARKMAP = gql`
  mutation CreateEmptySparkmap {
    createEmptySparkmap {
      id
    }
  }
`;
