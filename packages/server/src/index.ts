import './lib/env';
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors';
import express from 'express'
import schemaDirectives from './api/apollo/directives'
import resolvers from './api/apollo/resolvers'
import config from './configs'
import db from './db/repository'
import services from './services'
import path from 'path'
import { verifyToken } from './auth'
import { importSchema } from 'graphql-import'
import getLogger from './logger'
import winston from 'winston';
import MemberDataLoader from './dataloader/memberDataLoader';
import DataLoader from './dataloader';

const logger = getLogger()

const app = express();

// Body parser for parsing requests body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors());
app.use((err:any, req:any, res:any, next:any) => {
  logger.error(err)
  next()
})
app.use((req, res, next) => {
  logger.info(req.url)
  next()
})

const typeDefs = importSchema('**/schema.graphql')

// Apollo-server-express
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: async ({ req, res }) =>
    ({
      req,
      res,
      services,
      db,
      member: await verifyToken(req),
      dataloader: new DataLoader(new MemberDataLoader(db.member)) })
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (_req: any, res: { sendFile: (arg0: any) => void; }) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
} else {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// TODO: Temporary image store
app.use('/images_store', express.static(config.IMAGE_STORE_LOCATION || ''));

// Add express as a middleware
server.applyMiddleware({ app, cors: false });
app.get('*', (_req: any, res: any) => {
  res.redirect('http://localhost:3000');
});

app.listen(config.SERVER_PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at http://localhost:${config.SERVER_PORT}`);
});
