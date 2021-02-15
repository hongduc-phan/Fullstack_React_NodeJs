MATCH (s:Spark)-[:OWNED_BY]->(m:Member { email: "andres@aaa.com" })
MATCH (s)-[igr:IGNITE]->(:Ignite)
DELETE igr

MATCH (:Ignite)-[asm:ASSIGNED_BY]->(m:Member { email: "andres@aaa.com" })
DELETE asm

// delete spark with relations and nodes
MATCH (s:Spark {title:"New Child Test Spark 1"})-[br:BELONGS_TO]->(sm:SparkMap)
MATCH (s)-[ro:OWNED_BY]->(m:Member)
MATCH (s)-[rch:CHILD_OF]->(ps:Spark)
WITH s, br, sm, ro, m, rch, ps
DELETE s, br, sm, ro, m, rch, ps