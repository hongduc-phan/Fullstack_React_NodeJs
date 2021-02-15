import config from '../configs'
import neo4j, { Driver } from 'neo4j-driver'
import getLogger from '../logger'

const logger = getLogger()

let driver: Driver

export default function context() {
  if (!driver) {
    driver = neo4j.driver(
      config.NEO4J_URI || '',
        neo4j.auth.basic(config.NEO4J_USER || '', config.NEO4J_PWD || ''),
        {
          logging: { level: 'debug', logger: (l, msg) => {  } },
          //encrypted: 'ENCRYPTION_ON'
        }
    )
  }
  return { driver }
}