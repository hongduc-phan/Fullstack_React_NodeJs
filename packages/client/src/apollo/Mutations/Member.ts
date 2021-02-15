import gql from "graphql-tag";

export const REGISTER_MEMBER = gql`
  mutation(
    $membername: String!
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $birthdate: Date!
  ) {
    register(
      input: {
        membername: $membername
        email: $email
        password: $password
        firstname: $firstname
        lastname: $lastname
        birthdate: $birthdate
      }
    ) {
      token
    }
  }
`;

export const LOGIN_MEMBER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const LOG_OUT = gql`
  mutation {
    logout
  }
`;

export const CHANGE_EMAIL = gql`
  mutation changeEmail($newEmail: String!) {
    changeEmail(newEmail: $newEmail) {
      success
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

export const UPDATE_MEMBER_PROFILE = gql`
  mutation updateMemberProfile(
    $birthdate: Date
    $profilePictureUrl: String
    $coverImageUrl: String
    $aboutme: String
    $languages: [String!]
    $places: [String!]
    $website: String
    $background: [String!]
    $interests: [String!]
    $knowtypes: [String!]
  ) {
    updateMemberProfile(
      profile: {
        birthdate: $birthdate
        profilePictureUrl: $profilePictureUrl
        coverImageUrl: $coverImageUrl
        aboutme: $aboutme
        languages: $languages
        places: $places
        website: $website
        background: $background
        interests: $interests
        knowtypes: $knowtypes
      }
    ) {
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
