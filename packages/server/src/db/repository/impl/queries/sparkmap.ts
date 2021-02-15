import { OWNED_BY, BELONGS_TO } from './relations';

export const GET_SPARKSMAPS_QUERY = `MATCH (sm:SparkMap)-[:${OWNED_BY}]->(m:Member { id: $memberId})
     RETURN sm.id as id`;

export const GET_BY_ID_QUERY = `MATCH (n:SparkMap { id: $id}) RETURN n.id as id LIMIT 1`;

export const GET_BY_SPARK_ID_QUERY = `MATCH (:Spark { id: $sparkId })-[:${BELONGS_TO}]->(sm:SparkMap)
     RETURN sm.id as id`;
