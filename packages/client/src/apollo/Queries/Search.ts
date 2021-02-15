import gql from "graphql-tag";

export const GET_SEARCH = gql`
  query getSearch($keywords: [String!]!, $igniteIds: [String!]!) {
    search(query: { keywords: $keywords, igniteIds: $igniteIds }) {
      mainOrbit {
        sparks {
          id
          title
          description
          body
          backgroundImage
          updatedDatetime
          sparkmap {
            id
          }
          member {
            membername
          }
          ignites {
            igniteId
            memberId
          }
        }
      }

      otherResults {
        ignitesCount
        initialSparkImgUrl
        initialSparkTitle
        initiatedDate
        participantsCount
        sparkmapId
        sparksCount
        initiatedBy {
          membername
        }
        topParticipants {
          membername
        }
        topIgnites
      }
    }
  }
`;
