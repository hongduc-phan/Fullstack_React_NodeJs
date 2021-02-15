import { ASSIGNED_BY, IGNITE, INVITED, OWNED_BY } from './relations';
import { IGNITE_NODE, INVITATION_NODE, MEMBER_NODE, SPARK_NODE } from './types';

export const CREATE_MEMBER_QUERY = `CREATE (m:${MEMBER_NODE} {
        id: $id,
        membername: $membername,
        email: $email,
        password: $password,
        firstname: $firstname,
        lastname: $lastname,
        birthdate: $birthdate,
        isFirstLogin: true,
        createdDatetime: datetime(),
        updatedDatetime: datetime()
    })-[:${INVITED}]->(inv:${INVITATION_NODE} { id: $invitationId, createdDatetime: datetime() })
    RETURN
        m.id as id,
        m.membername as membername,
        m.email as email,
        m.password as password,
        m.firstname as firstname,
        m.lastname as lastname,
        m.birthdate as birthdate,
        inv.id as invitationId`;

export const GET_USER_BY_EMAIL = `MATCH (n:${MEMBER_NODE} { email: $email })
     RETURN
        n.id as id,
        n.membername as membername,
        n.password as password,
        n.email as email
     LIMIT 1`;

const RETURN_STATEMENT = `RETURN DISTINCT
        n.id as id,
        n.membername as membername,
        n.email as email,
        n.firstname as firstname,
        n.lastname as lastname,
        n.birthdate as birthdate,
        n.profilePictureUrl as profilePictureUrl,
        n.coverImageUrl as coverImageUrl,
        n.aboutme as aboutme,
        n.languages as languages,
        n.places as places,
        n.website as website,
        n.background as background,
        n.interests as interests,
        n.knowtypes as knowtypes,
        n.isFirstLogin as isFirstLogin`;

export const GET_USER_BY_ID = `MATCH (n:${MEMBER_NODE} { id: $id })
     ${RETURN_STATEMENT}`;

export const GET_ALL_USERS = `
    MATCH (n:${MEMBER_NODE})
    ${RETURN_STATEMENT}
    `;

export const GET_MEMBER_BY_SPARK_QUERY = `MATCH (:Spark { id: $sparkId })-[:${OWNED_BY}]->(n:Member)
     ${RETURN_STATEMENT}`;

export const UPDATE_MEMBER_QUERY = `MATCH (n:${MEMBER_NODE} { id: $id })
     SET n.firstname = COALESCE($firstname, n.firstname),
        n.lastname = COALESCE($lastname, n.lastname),
        n.birthdate = COALESCE($birthdate, n.birthdate),
        n.profilePictureUrl = COALESCE($profilePictureUrl, n.profilePictureUrl),
        n.coverImageUrl = COALESCE($coverImageUrl, n.coverImageUrl),
        n.aboutme = COALESCE($aboutme, n.aboutme),
        n.languages = COALESCE($languages, n.languages),
        n.places = COALESCE($places, n.places),
        n.website = COALESCE($website, n.website),
        n.background = COALESCE($background, n.background),
        n.interests = COALESCE($interests, n.interests),
        n.knowtypes = COALESCE($knowtypes, n.knowtypes),
        n.isFirstLogin = COALESCE($isFirstLogin, n.isFirstLogin),
        n.updatedDatetime = datetime()
     ${RETURN_STATEMENT}`;

export const UPDATE_PASSWORD_QUERY = `MATCH (n:${MEMBER_NODE} { id: $memberId })
     SET n.password = $newPasswordHash,
          n.updatedDatetime = datetime()
     ${RETURN_STATEMENT}`;

export const UPDATE_EMAIL_QUERY = `MATCH (n:${MEMBER_NODE} { id: $memberId })
     SET n.email = $newEmail,
          n.updatedDatetime = datetime()
     ${RETURN_STATEMENT}`;

export const GET_INVITATION_QUERY = `
    MATCH (m:${MEMBER_NODE} { id: $memberId })-[:${INVITED}]-(inv:${INVITATION_NODE})
    RETURN m.id as memberId, inv.id as invitationId, inv.createdDatetime as createdDatetime
    `;

export const GET_TOP_PARTICIPANTS_FOR_SPARK = `
    MATCH (s:${SPARK_NODE} { id: $sparkId })-[:${IGNITE}]->(ig:${IGNITE_NODE})-[:${ASSIGNED_BY}]->(n:${MEMBER_NODE})
    WITH  n, count(n) as cnt
    ORDER BY cnt DESC
    ${RETURN_STATEMENT}
    LIMIT 5`;
