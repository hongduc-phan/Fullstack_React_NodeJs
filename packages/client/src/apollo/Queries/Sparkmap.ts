import gql from "graphql-tag";

export const SPARKMAP = gql`
  query getSparkmap($id: ID!) {
    sparkmap(id: $id) {
      id
    }
  }
`;

export const SPARKMAPS = gql`
  query getSparkmaps {
    sparkmaps {
      id
    }
  }
`;
