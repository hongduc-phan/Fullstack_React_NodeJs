import context from '../context';
import { QueryResult, Result } from 'neo4j-driver';
import getLogger from '../../logger'

const driver = context().driver

const logger = getLogger()

export async function executeQuery(query:string, data:any):Promise<QueryResult> {
    logger.info(`Executing query: ${query}`)

    const session = driver.session();
    try {
        return await session.writeTransaction(tx => tx.run(query, data))
    } finally {
        await session.close()
    }
}

export async function executeQueryList(
    executeParameters:ExecuteParameter[]):Promise<QueryResult[]> {
    logger.info(`Executing query list: ${JSON.stringify(executeParameters.map(p => p.query))}`)
    const session = driver.session();
    try {
        return await session.writeTransaction(async tx => {
            const res: QueryResult[] = []
            for (const execParam of executeParameters) {
                res.push(await tx.run(execParam.query, execParam.parameters))
            }
            return res
        })
    } finally {
        await session.close()
    }
}

export interface ExecuteParameter {
    query: string;
    parameters: any;
}