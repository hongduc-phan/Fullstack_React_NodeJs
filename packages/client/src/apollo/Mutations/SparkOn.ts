import gql from "graphql-tag";

export const CREATE_SPARKON = gql`
  mutation createSparkon(
    $title: String!
    $description: String!
    $body: String!
    $parentSparkId: ID!
    $backgroundImage: String
    $ignites: [String!] = []
  ) {
    createSparkon(
      input: {
        title: $title
        description: $description
        body: $body
        parentSparkId: $parentSparkId
        backgroundImage: $backgroundImage
        ignites: $ignites
      }
    ) {
      id
      title
      description
      body
      children {
        id
      }
      parent {
        id
      }
      sparkmap {
        id
      }
      isDraft
    }
  }
`;
