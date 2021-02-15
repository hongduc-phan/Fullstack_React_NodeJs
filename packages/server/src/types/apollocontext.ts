import express from 'express'
import JWTPayload from './jwtpayload'
import DatabaseRepository from '../db/repository/interfaces/database'
import Services from 'src/services/interfaces/services'
import DataLoader from 'src/dataloader'

export default interface ApolloContext {
    req: express.Request;
    res: express.Response;
    db: DatabaseRepository;
    member: JWTPayload;
    services: Services;
    dataloader: DataLoader;
}