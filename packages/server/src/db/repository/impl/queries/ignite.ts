import { IGNITE } from './relations';
import { IGNITE_NODE, SPARK_NODE } from './types';

export const GET_IGNITES_USAGE_QUERY = `
    MATCH (i:${IGNITE_NODE})
    RETURN distinct i.id as igniteId, count(distinct i) as usageCount
    `;

export const GET_TOP_IGNITES_FOR_SPARK = `
    MATCH (s:${SPARK_NODE} { id: $sparkId })-[:${IGNITE}]->(ig:${IGNITE_NODE})
    RETURN ig.id as igniteId, count(ig) as usageCount
    ORDER BY usageCount DESC
    LIMIT 5`;
