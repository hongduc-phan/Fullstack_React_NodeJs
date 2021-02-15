import gql from "graphql-tag";

export const CREATE_SPARK = gql`
  mutation createSpark(
    $title: String!
    $description: String!
    $body: String!
    $backgroundImage: String = null
    $ignites: [String!]
  ) {
    createSpark(
      input: {
        title: $title
        description: $description
        body: $body
        backgroundImage: $backgroundImage
        ignites: $ignites
      }
    ) {
      id
      title
      description
      body
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

export const UPDATE_SPARK = gql`
  mutation updateSpark($id: ID!, $title: String, $description: String, $body: String, $backgroundImage: String) {
    updateSpark(
      spark: { id: $id, title: $title, description: $description, body: $body, backgroundImage: $backgroundImage }
    ) {
      id
      title
      description
      body
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

export const DELETE_SPARK = gql`
  mutation deleteSpark($sparkId: ID!) {
    deleteSpark(sparkId: $sparkId) {
      id
    }
  }
`;
