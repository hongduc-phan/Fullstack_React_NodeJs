import { BELONGS_TO, CHILD_OF, OWNED_BY, IGNITE, ASSIGNED_BY } from './relations';
import { IGNITE_NODE, SPARK_NODE, MEMBER_NODE, SPARKMAP_NODE } from './types';

export const RETURN_SPARK_STATEMENT = `RETURN
        n.id as id,
        n.title as title,
        n.description as description,
        n.body as body,
        n.isDraft as isDraft,
        n.backgroundImage as backgroundImage,
        member.id as memberId,
        sparkmap.id as sparkmapId,
        parent.id as parentSparkId,
        n.createdDatetime as createdDatetime,
        n.updatedDatetime as updatedDatetime`;

export const CREATE_SPARK_QUERY = `
    MATCH (member:${MEMBER_NODE} { id: $memberId })
    CREATE (n:${SPARK_NODE} {
        id: $id,
        title: $title,
        description: $description,
        body: $body,
        isDraft: $isDraft,
        backgroundImage: COALESCE($backgroundImage, ""),
        createdDatetime: datetime(),
        updatedDatetime: datetime()
    })
    CREATE (n)-[:${OWNED_BY}]->(member)
    CREATE (n)-[:${BELONGS_TO}]->(sparkmap:${SPARKMAP_NODE} {id: $id, createdDatetime: datetime(), updatedDatetime: datetime()})
    CREATE (sparkmap)-[:${OWNED_BY}]->(member)
    WITH null as parent, n, member, sparkmap
    ${RETURN_SPARK_STATEMENT}
    `;

export const CREATE_SPARK_ON_QUERY = `
    MATCH (parent:${SPARK_NODE} { id: $parentSparkId })-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    MATCH (member:${MEMBER_NODE} { id: $memberId })
    CREATE (n:${SPARK_NODE} {
        id: $id,
        title: $title,
        description: $description,
        body: $body,
        isDraft: $isDraft,
        backgroundImage: COALESCE($backgroundImage, ""),
        createdDatetime: datetime(),
        updatedDatetime: datetime()
    })
    CREATE (n)-[:${OWNED_BY}]->(member)
    CREATE (n)-[:${BELONGS_TO}]->(sparkmap)
    CREATE (n)-[:${CHILD_OF}]->(parent)
    ${RETURN_SPARK_STATEMENT}
    `;

export const GET_SINGLE_SPARK_QUERY = `MATCH (n:${SPARK_NODE} { id: $id})
     MATCH (n)-[:${OWNED_BY}]->(member:${MEMBER_NODE})
     MATCH (n)-[:${BELONGS_TO}]->(sparkmap:${SPARKMAP_NODE})
     OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
     ${RETURN_SPARK_STATEMENT}
     LIMIT 1`;

export const GET_SPARKS_BY_MAP_QUERY = `MATCH (n:${SPARK_NODE})-[:${BELONGS_TO}]->(sparkmap:${SPARKMAP_NODE} { id: $sparkmapId})
     MATCH (n)-[:${OWNED_BY}]->(member:${MEMBER_NODE})
     OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
     ${RETURN_SPARK_STATEMENT}`;

export const GET_ALL_SPARKS_QUERY = `MATCH (n:${SPARK_NODE})-[:${BELONGS_TO}]->(sparkmap:${SPARKMAP_NODE})
      MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
      OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
      ${RETURN_SPARK_STATEMENT}`;

export const GET_CHILDREN_QUERY = `MATCH (n:${SPARK_NODE})-[:${CHILD_OF}]->(parent:${SPARK_NODE} { id: $parentId })
     MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
     MATCH (n)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
     ${RETURN_SPARK_STATEMENT}`;

export const GET_PARENT_BY_CHILD_QUERY = `MATCH (:${SPARK_NODE} { id: $childId })-[:${CHILD_OF}]->(n:${SPARK_NODE})
     MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
     MATCH (n)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
     OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
     ${RETURN_SPARK_STATEMENT}`;

export const DELETE_SPARK_QUERY = `MATCH (s:${SPARK_NODE} { id: $sparkId, isDraft: true })
     MATCH (s)-[r_owned_by:${OWNED_BY}]->(:${MEMBER_NODE})
     MATCH (s)-[r_belongs_to:${BELONGS_TO}]->(:${SPARKMAP_NODE})
     OPTIONAL MATCH (s)-[r_child_of:${CHILD_OF}]->(:${SPARK_NODE})
     WITH s, r_owned_by, r_belongs_to, r_child_of, s.id as id,
        s.title as title,
        s.description as description,
        s.body as body,
        s.member as member,
        s.sparkmap as sparkmap,
        s.parent as parent,
        s.isDraft as isDraft,
        s.backgroundImage as backgroundImage
     DELETE s, r_owned_by, r_belongs_to, r_child_of
     RETURN
        id,
        title,
        description,
        body,
        member,
        sparkmap,
        parent,
        isDraft,
        backgroundImage`;

export const UPDATE_SPARK_QUERY = `MATCH (n:${SPARK_NODE} { id: $id })
      MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
      MATCH (n)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
      OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
      OPTIONAL MATCH (n2:${SPARK_NODE} { id: $id })
      WHERE n2.isDraft = true AND NOT EXISTS ((:${SPARK_NODE})-[:${CHILD_OF}]->(:${SPARK_NODE} { id: $id }))
      SET n2.title = COALESCE($title, n2.title),
         n2.description = COALESCE($description, n2.description),
         n2.updatedDatetime = datetime(),
         n.body = COALESCE($body, n.body),
         n.backgroundImage = COALESCE($backgroundImage, n.backgroundImage),
         n.updatedDatetime = datetime()
      ${RETURN_SPARK_STATEMENT}`;

export const PUBLISH_SPARK_QUERY = `MATCH (n:${SPARK_NODE} { id: $sparkId })
         MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
         MATCH (n)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
         OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
         SET n.isDraft = false,
            n.updatedDatetime = datetime()
         ${RETURN_SPARK_STATEMENT}`;

export const CREATE_SPARK_IGNITE_QUERY = `
        MATCH (spark:${SPARK_NODE} { id: $sparkId }), (member:${MEMBER_NODE} { id: $memberId })
        CREATE (spark)-[:${IGNITE}]->(ignite:${IGNITE_NODE} { id: $igniteId, createdDatetime: datetime() })
        CREATE (ignite)-[:${ASSIGNED_BY}]->(member)
        RETURN ignite.id as igniteId, member.id as memberId
        `;

export const GET_SPARK_IGNITES_QUERY = `
        MATCH (spark:${SPARK_NODE} { id: $sparkId })-[:${IGNITE}]-(ignite:${IGNITE_NODE})-[:${ASSIGNED_BY}]->(member:${MEMBER_NODE})
        RETURN ignite.id as igniteId, member.id as memberId
        `;

export const DELETE_SPARK_IGNITES_QUERY = `
    MATCH (spark:${SPARK_NODE} { id: $sparkId })-[ig_rel:${IGNITE}]-(ignite:${IGNITE_NODE})-[m_rel:${ASSIGNED_BY}]->(member:${MEMBER_NODE} { id: $memberId})
    WITH ig_rel, m_rel, ignite, ignite.id as igniteId, member.id as memberId
    DELETE ig_rel, m_rel, ignite
    RETURN igniteId, memberId
    `;

export const GET_BEST_FIT_SPARKS = `
    MATCH (cs:${SPARK_NODE} { id: $sparkId })-[:${IGNITE}]->(igc:${IGNITE_NODE})
    MATCH (n:${SPARK_NODE})-[:${IGNITE}]->(ig:${IGNITE_NODE})
    WHERE ig.id IN igc.id AND n.id <> cs.id
    WITH n, count(ig) as cnt
    ORDER BY cnt DESC
    MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
    MATCH (n)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
    ${RETURN_SPARK_STATEMENT}
`;

export const GET_BEST_FIT_FOR_PROFILE = `
    MATCH (m:${MEMBER_NODE} { id: $memberId })
    OPTIONAL MATCH (n:${SPARK_NODE})-[:${IGNITE}]->(ig:${IGNITE_NODE})
    WHERE ig.id in m.background or ig.id in m.interests or ig.id in m.knowtypes
    WITH n, count(ig) as cnt
    ORDER BY cnt DESC
    MATCH (n)-[:${OWNED_BY}]-(member:${MEMBER_NODE})
    MATCH (n)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    OPTIONAL MATCH (n)-[:${CHILD_OF}]->(parent:${SPARK_NODE})
    ${RETURN_SPARK_STATEMENT}
`;
