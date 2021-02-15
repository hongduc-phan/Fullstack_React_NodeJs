import gql from "graphql-tag";

export const SINGLE_UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      url
    }
  }
`;
