import gql from "graphql-tag";

export const GET_PUBLIC_PUBLIC = gql`
  query getPublicProfile($memberId: ID!) {
    publicProfile(memberId: $memberId) {
      id
      membername
      firstname
      lastname
      profilePictureUrl
      coverImageUrl
      aboutme
    }
  }
`;

export const GET_PRIVATE_PROFILE = gql`
  query getPrivateProfile {
    privateProfile {
      id
      membername
      firstname
      lastname
      birthdate
      profilePictureUrl
      coverImageUrl
      aboutme
      languages
      places
      website
      background
      interests
      knowtypes
    }
  }
`;
