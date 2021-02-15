import { ASSIGNED_BY, BELONGS_TO, CHILD_OF, IGNITE, OWNED_BY } from './relations';
import { IGNITE_NODE, MEMBER_NODE, SPARKMAP_NODE, SPARK_NODE } from './types';

export const SEARCH_GET_ORBIT_QUERY = `
    MATCH (ch:${SPARK_NODE})-[:${CHILD_OF}]->(s:${SPARK_NODE})
    OPTIONAL MATCH (s)-[:${IGNITE}]->(i:${IGNITE_NODE})
    OPTIONAL MATCH (ich:${IGNITE_NODE})<-[:${IGNITE}]-(ch)
    WITH
        s,
        ch,
        i,
        ich,
        size(apoc.coll.intersection(collect(i.id), $igniteIds)) as ig_count,
        size(apoc.coll.intersection(collect(ich.id), $igniteIds)) as ch_ig_count,
        size(apoc.coll.intersection(split(toLower(s.description+' '+s.title+' '+s.body), ' '), $keywords)) as key_count,
        size(apoc.coll.intersection(split(toLower(ch.description+' '+ch.title+' '+ch.body), ' '), $keywords)) as ch_key_count
    ORDER BY ig_count + ch_ig_count + key_count + ch_key_count DESC
    WHERE (key_count > 0 and ch_key_count > 0) or (ig_count > 0 and ch_ig_count > 0)
    MATCH (s)-[:${OWNED_BY}]-(m:${MEMBER_NODE})
    MATCH (s)-[:${BELONGS_TO}]-(sm:SparkMap)
    MATCH (ch)-[:${OWNED_BY}]-(mch:${MEMBER_NODE})
    MATCH (ch)-[:${BELONGS_TO}]-(smch:SparkMap)
    WITH ch, mch, smch, {
            id: s.id,
            title: s.title,
            description: s.description,
            body: s.body,
            isDraft: s.isDraft,
            backgroundImage: s.backgroundImage,
            memberId: m.id,
            sparkmapId: sm.id,
            parentSparkId: null,
            createdDatetime: s.createdDatetime,
            updatedDatetime: s.updatedDatetime
    } as center
    WITH center, {
            id: ch.id,
            title: ch.title,
            description: ch.description,
            body: ch.body,
            isDraft: ch.isDraft,
            backgroundImage: ch.backgroundImage,
            memberId: mch.id,
            sparkmapId: smch.id,
            parentSparkId: center.id,
            createdDatetime: ch.createdDatetime,
            updatedDatetime: ch.updatedDatetime
    } as sparkOn
    RETURN DISTINCT
        center,
        collect(DISTINCT sparkOn) as sparkOns
    LIMIT 1
`;

export const SEARCH_GET_CARDS_QUERY = `
    MATCH (ch:${SPARK_NODE})-[:${CHILD_OF}]->(s:${SPARK_NODE})-[:${BELONGS_TO}]->(sm:${SPARKMAP_NODE})
    OPTIONAL MATCH (s)-[:${IGNITE}]->(i:${IGNITE_NODE})
    OPTIONAL MATCH (ich:${IGNITE_NODE})<-[:${IGNITE}]-(ch)
    WITH
        sm,
        size(apoc.coll.intersection(collect(i.id), $igniteIds)) as ig_count,
        size(apoc.coll.intersection(collect(ich.id), $igniteIds)) as ch_ig_count,
        size(apoc.coll.intersection(split(toLower(s.description+' '+s.title+' '+s.body), ' '), $keywords)) as key_count,
        size(apoc.coll.intersection(split(toLower(ch.description+' '+ch.title+' '+ch.body), ' '), $keywords)) as ch_key_count
    ORDER BY ig_count + ch_ig_count + key_count + ch_key_count DESC
    WHERE (key_count > 0 and ch_key_count > 0) or (ig_count > 0 and ch_ig_count > 0)
    WITH DISTINCT sm
    MATCH (m:${MEMBER_NODE})<-[:${OWNED_BY}]-(s:${SPARK_NODE})-[:${BELONGS_TO}]->(sm)
    WITH sm, count(DISTINCT m) as participantsCount, count(s) as sparksCount
    MATCH (s:${SPARK_NODE})-[:${BELONGS_TO}]->(sm)
    OPTIONAL MATCH (s)-[:${IGNITE}]->(i:${IGNITE_NODE})-[:${ASSIGNED_BY}]->(m:${MEMBER_NODE})
    WITH sm, count(i) as ignitesCount, sparksCount, participantsCount+count(DISTINCT m) as participantsCount
    MATCH (m:${MEMBER_NODE})<-[:${OWNED_BY}]-(s:${SPARK_NODE})-[:${BELONGS_TO}]->(sm)
    WHERE NOT EXISTS((s)-[:${CHILD_OF}]->(:${SPARK_NODE}))
    WITH
        sm,
        {
            id: m.id,
            membername: m.membername,
            email: m.email,
            firstname: m.firstname,
            lastname: m.lastname,
            birthdate: m.birthdate,
            profilePictureUrl: m.profilePictureUrl,
            coverImageUrl: m.coverImageUrl,
            aboutme: m.aboutme,
            languages: m.languages,
            places: m.places,
            website: m.website,
            background: m.background,
            interests: m.interests,
            knowtypes: m.knowtypes,
            isFirstLogin: m.isFirstLogin
        } as initiatedBy,
        s.createdDatetime as initiatedDate,
        s.backgroundImage as initialSparkImgUrl,
        s.title as initialSparkTitle,
        ignitesCount,
        sparksCount,
        participantsCount
    CALL {
        WITH sm
        MATCH (s:${SPARK_NODE})-[:${BELONGS_TO}]->(sm)
        OPTIONAL MATCH (s)-[:${IGNITE}]->(i:${IGNITE_NODE})
        WITH i.id as igniteId, count(i) as c
        ORDER BY c DESC
        LIMIT 5
        RETURN collect(igniteId) as topIgnites
    }
    CALL {
        WITH sm
        MATCH (m1:${MEMBER_NODE})<-[:${OWNED_BY}]-(s:${SPARK_NODE})-[:${BELONGS_TO}]->(sm)
        OPTIONAL MATCH (s)-[:${IGNITE}]->(i:${IGNITE_NODE})-[:${ASSIGNED_BY}]->(m2:${MEMBER_NODE})
        UNWIND [m1,m2] as m
        WITH
            {
                id: m.id,
                membername: m.membername,
                email: m.email,
                firstname: m.firstname,
                lastname: m.lastname,
                birthdate: m.birthdate,
                profilePictureUrl: m.profilePictureUrl,
                coverImageUrl: m.coverImageUrl,
                aboutme: m.aboutme,
                languages: m.languages,
                places: m.places,
                website: m.website,
                background: m.background,
                interests: m.interests,
                knowtypes: m.knowtypes,
                isFirstLogin: m.isFirstLogin
            } as m,
            count(m) as c
        ORDER BY c DESC
        LIMIT 5
        WHERE m.id is not NULL
        RETURN collect(m) as topParticipants
    }
    RETURN
        sm.id as sparkmapId,
        initialSparkTitle,
        initialSparkImgUrl,
        ignitesCount,
        sparksCount,
        participantsCount,
        topIgnites,
        topParticipants,
        initiatedBy,
        initiatedDate
`;
