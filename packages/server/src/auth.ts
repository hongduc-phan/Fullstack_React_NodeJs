import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken'
import config from './configs'

export const verifyToken = (req: any) => new Promise((resolve,reject) => {
    if (!req.headers.authorization)
        resolve()

    let token = req.headers.authorization
    if (token.startsWith('Bearer '))
        token = token.slice(7, token.length)

    if (!token) resolve()

    jwt.verify(token, config.SECRET_OR_KEY || '', (err: any, decoded: any) => {
        if (err) {
            resolve()
            return
        }
        resolve(decoded)
    })
})

export const ensureSignedIn = (context: { member: any; }) => {
    if (!context.member)
        throw new AuthenticationError('')
}

export const ensureSignedOut = (context: { member: any; }) => {
    if (context.member)
        throw new AuthenticationError('')
}

// tslint:disable-next-line: no-empty
export const signOut = (req: any, res: any)=> new Promise((resolve, reject)=> {

})

