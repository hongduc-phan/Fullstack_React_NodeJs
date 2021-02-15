import gql from "graphql-tag";

export const GET_IGNITES = gql`
  query getIgnites {
    ignites {
      id
      ignites {
        id
        usageCount
      }
      children {
        id
        ignites {
          id
          usageCount
        }
        children {
          id
          ignites {
            id
            usageCount
          }
          children {
            id
            ignites {
              id
              usageCount
            }
            children {
              ignites {
                id
                usageCount
              }
              id
            }
          }
        }
      }
    }
  }
`;
