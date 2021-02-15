import IgniteRepository from '../interfaces/ignite'
import { IgniteUsageCount } from 'src/models/ignite'
import { executeQuery } from '../../neo4j/executequery'
import { GET_IGNITES_USAGE_QUERY, GET_TOP_IGNITES_FOR_SPARK } from './queries/ignite'
import { ApolloError } from 'apollo-server-express'

async function getIgniteUsageCounts():Promise<IgniteUsageCount[]> {
    const result = await executeQuery(GET_IGNITES_USAGE_QUERY, null)

    if (!result) throw new ApolloError('getIgniteUsageCounts Error')

    return result.records.map(r => ({
        igniteId: r.get('igniteId'),
        usageCount: r.get('usageCount').low }))
}

async function getTopIgnitesForSpark(sparkId:string): Promise<IgniteUsageCount[]> {
    const result = await executeQuery(GET_TOP_IGNITES_FOR_SPARK, { sparkId })

    if (!result) throw new ApolloError('getTopIgnitesForSpark Error')

    return result.records.map(r => ({
        igniteId: r.get('igniteId'),
        usageCount: r.get('usageCount').low }))
}

const igniteRepo: IgniteRepository = {
    getIgniteUsageCounts,
    getTopIgnitesForSpark
}

export default igniteRepo