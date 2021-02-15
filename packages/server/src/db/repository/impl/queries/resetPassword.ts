import { RESET_PASSWORD_REQUEST_NODE, MEMBER_NODE } from './types';
import { RESET_PASSWORD_REQUESTED } from './relations';

export const RESET_PASSWORD_REQUEST_QUERY = `
    MATCH (m:${MEMBER_NODE} { id: $memberId })
    CREATE (rp:${RESET_PASSWORD_REQUEST_NODE} {
        id: $id,
        set: false,
        createdDatetime: datetime(),
        updatedDatetime: datetime()
    })-[:${RESET_PASSWORD_REQUESTED}]-(m)
    RETURN rp.id as resetId
    `;

export const GET_MEMBER_BY_RESET_ID_QUERY = `
    MATCH (m:${MEMBER_NODE})-[:${RESET_PASSWORD_REQUESTED}]-(:${RESET_PASSWORD_REQUEST_NODE} { id: $resetId, set: false })
    RETURN
        m.id as id,
        m.membername as membername,
        m.password as password,
        m.email as email
    `;

export const SET_NEW_PASSWORD_QUERY = `
    MATCH (m:${MEMBER_NODE} { id: $memberId })-[:${RESET_PASSWORD_REQUESTED}]-(rp:${RESET_PASSWORD_REQUEST_NODE} { id: $resetId, set: false })
    SET m.password = $newPasswordHash,
        m.updatedDatetime = datetime(),
        rp.set = true,
        rp.updatedDatetime = datetime()
    RETURN rp.id as resetId
    `;
