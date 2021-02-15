import { CHILD_OF, OWNED_BY, BELONGS_TO, IGNITE, ASSIGNED_BY } from './relations';
import { MEMBER_NODE, SPARKMAP_NODE, IGNITE_NODE, SPARK_NODE } from './types';

export const GET_RECEIVED_SPARKS_QUERY =
    `
    MATCH (s:${SPARK_NODE})-[:${OWNED_BY}]->(member:${MEMBER_NODE} {id: $memberId})
    MATCH (s)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    MATCH (s)-[:${CHILD_OF}]->(p:${SPARK_NODE})
    WHERE NOT (p)-[:${OWNED_BY}]->(:Member {id: $memberId})
    RETURN
        s.id as id,
        s.title as title,
        s.description as description,
        s.body as body,
        s.isDraft as isDraft,
        s.backgroundImage as backgroundImage,
        count(distinct p) as count,
        member.id as memberId,
        sparkmap.id as sparkmapId,
        p.id as parentSparkId
    `

export const GET_DONATED_SPARKS_QUERY =
    `
    MATCH (s:${SPARK_NODE})-[:${OWNED_BY}]->(member:${MEMBER_NODE} {id: $memberId})
    MATCH (s)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    OPTIONAL MATCH (s)-[:${CHILD_OF}]->(p:${SPARK_NODE})
    MATCH (ch:${SPARK_NODE})-[:${CHILD_OF}]->(s)
    WHERE NOT (ch)-[:${OWNED_BY}]->(:${MEMBER_NODE} {id: $memberId})
    RETURN
        s.id as id,
        s.title as title,
        s.description as description,
        s.body as body,
        s.isDraft as isDraft,
        s.backgroundImage as backgroundImage,
        count(distinct ch) as count,
        member.id as memberId,
        sparkmap.id as sparkmapId,
        p.id as parentSparkId
    `

export const GET_IGNITES_RECEIVED_SPARKS_QUERY =
    `
    MATCH (ri:${IGNITE_NODE})-[:${IGNITE}]-(s:${SPARK_NODE})-[:${OWNED_BY}]->(member:${MEMBER_NODE} {id: $memberId})
    WHERE NOT (ri)-[:${ASSIGNED_BY}]-(:${MEMBER_NODE} {id: $memberId})
    MATCH (s)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    OPTIONAL MATCH (s)-[:${CHILD_OF}]->(p:${SPARK_NODE})
    RETURN
        s.id as id,
        s.title as title,
        s.description as description,
        s.body as body,
        s.isDraft as isDraft,
        s.backgroundImage as backgroundImage,
        count(distinct ri) as count,
        member.id as memberId,
        sparkmap.id as sparkmapId,
        p.id as parentSparkId
    `

export const GET_IGNITES_DONATED_SPARKS_QUERY =
    `
    MATCH (s:${SPARK_NODE})-[:${IGNITE}]-(di:${IGNITE_NODE})
    WHERE (di)-[:${ASSIGNED_BY}]-(:${MEMBER_NODE} {id: $memberId}) AND NOT (s)-[:${OWNED_BY}]->(:${MEMBER_NODE} { id: $memberId})
    MATCH (s)-[:${BELONGS_TO}]-(sparkmap:${SPARKMAP_NODE})
    MATCH (s)-[:${OWNED_BY}]->(member:${MEMBER_NODE})
    OPTIONAL MATCH (s)-[:${CHILD_OF}]->(p:${SPARK_NODE})
    RETURN
        s.id as id,
        s.title as title,
        s.description as description,
        s.body as body,
        s.isDraft as isDraft,
        s.backgroundImage as backgroundImage,
        count(distinct di) as count,
        member.id as memberId,
        sparkmap.id as sparkmapId,
        p.id as parentSparkId
    `