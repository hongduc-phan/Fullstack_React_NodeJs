## Hunome platform source code

### Get started

In order to run this application, you need to follow the following steps:

1. Download and install the following:

   - Nodejs (latest LTS): https://nodejs.org/en/download/
   - Yarn: https://yarnpkg.com/
   - Neo4j: https://neo4j.com/download/

2. Make sure to create `.env` in `packages/server` directory with configuration from Confluence

3. Run Neo4j DB with DB configuration from Confluence. The DB configuration should match the one in `.env` file

4. Run `yarn` in the project root to install all the dependencies

5. Finally, run either `yarn dev` to parallely run `server` and `client` dev servers or `yarn start` to run a production build of UI hosted by the server

### Code styling

To be Added..
