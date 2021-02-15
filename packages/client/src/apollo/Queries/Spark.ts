import gql from "graphql-tag";

export const GET_SPARK = gql`
  query getSpark($id: ID!) {
    spark(id: $id) {
      id
      title
      description
      body
      sparkmap {
        id
      }
      member {
        id
        membername
      }
      parent {
        id
      }
      isDraft
      backgroundImage
      children {
        id
        title
        description
        body
        backgroundImage
        children {
          id
        }
        ignites {
          igniteId
          memberId
        }
      }
      ignites {
        igniteId
        memberId
      }
    }
  }
`;

export const GET_SPARKS = gql`
  query getSparks($sparkmapId: ID!) {
    sparks(sparkmapId: $sparkmapId) {
      id
      title
      description
      body
      sparkmap {
        id
      }
      member {
        id
        membername
      }
      parent {
        id
      }
      isDraft
      backgroundImage
      children {
        id
      }
      ignites {
        igniteId
        memberId
      }
    }
  }
`;

export const GET_BEST_FIT_SPARKS = gql`
  query getBestFitSparks($sparkId: ID!) {
    getBestFitSparks(sparkId: $sparkId) {
      sparks {
        id
        title
        description
        body
        sparkmap {
          id
        }
        member {
          id
          membername
        }
        parent {
          id
        }
        isDraft
        backgroundImage
        children {
          id
        }
        ignites {
          igniteId
          memberId
        }
      }
    }
  }
`;

export const GET_BEST_FIT_FOR_PROFILE = gql`
  query getBestFitForProfile {
    getBestFitForProfile {
      sparks {
        id
        title
        description
        body
        createdDatetime
        updatedDatetime
        sparkmap {
          id
        }
        member {
          id
          membername
        }
        parent {
          id
        }
        isDraft
        backgroundImage
        children {
          id
        }
        ignites {
          igniteId
          memberId
        }
      }
    }
  }
`;

export const GET_SPARKONS_LIST = gql`
  query getSparkOnsList($sparkId: ID!) {
    spark(id: $sparkId) {
      id
      title
      description
      backgroundImage
      ignites {
        igniteId
        memberId
      }
      sparkmap {
        id
      }
      member {
        id
        membername
      }
      children {
        id
        title
        body
        description
        sparkmapId
        sparkmap {
          id
        }
        member {
          membername
        }
        updatedDatetime
        backgroundImage
        children {
          id
        }
        ignites {
          igniteId
          memberId
        }
        topParticipants {
          id
          profilePictureUrl
        }
        topIgnites {
          id
          usageCount
        }
      }
    }
  }
`;
