import { EMAIL_VERIFICATION_NODE, MEMBER_NODE } from './types';

const RETURN_STATEMENT = `RETURN
        ev.id as id,
        ev.code as code,
        ev.email as email,
        ev.verified as verified,
        ev.createdDatetime as createdDatetime,
        ev.updatedDatetime as updatedDatetime`;

export const SAVE_EMAIL_VERIFY_CODE = `
    CREATE (ev:${EMAIL_VERIFICATION_NODE} {
        id: $id,
        code: $code,
        email: $email,
        verified: false,
        createdDatetime: datetime(),
        updatedDatetime: datetime()
    })
    ${RETURN_STATEMENT}
    `;

export const SET_EMAIL_VERIFIED = `
    MATCH (ev:${EMAIL_VERIFICATION_NODE} { code: $code, email: $email, verified: false })
    SET ev.verified = true,
        ev.updatedDatetime = datetime()
    ${RETURN_STATEMENT}
    `;

export const GET_MEMBERNAME_OR_EMAIL_QUERY = `
    OPTIONAL MATCH (m1:${MEMBER_NODE} { email: $email })
    OPTIONAL MATCH (m2:${MEMBER_NODE} { membername: $membername })
    RETURN
        m1.email as email,
        m2.membername as membername
    `;
