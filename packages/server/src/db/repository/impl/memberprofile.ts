import MemberProfileRepository from '../interfaces/memberprofile'
import { SparkStat } from 'src/models/sparkstat'
import {
    GET_RECEIVED_SPARKS_QUERY,
    GET_DONATED_SPARKS_QUERY,
    GET_IGNITES_RECEIVED_SPARKS_QUERY,
    GET_IGNITES_DONATED_SPARKS_QUERY } from './queries/memberprofile';
import { Record as DbRecord } from 'neo4j-driver'
import context from '../../context';
import { executeQuery } from '../../neo4j/executequery';
import { sparkRecordToSpark } from './mappers';

const driver = context().driver

const recordToModel = (r:DbRecord): SparkStat => ({
    spark: sparkRecordToSpark(r),
    count: r.get('count').low
})

async function getReceivedSparksCount(memberId: string): Promise<SparkStat[]> {
    const result = await executeQuery(GET_RECEIVED_SPARKS_QUERY, { memberId })

    if (!result) throw new Error(`Failed to execute query:${GET_RECEIVED_SPARKS_QUERY}`)

    return result.records.map(recordToModel)
}

async function getDonatedSparksCount(memberId: string): Promise<SparkStat[]> {
    const result = await executeQuery(GET_DONATED_SPARKS_QUERY, { memberId })

    if (!result) throw new Error(`Failed to execute query:${GET_DONATED_SPARKS_QUERY}`)

    return result.records.map(recordToModel)
}

async function getReceivedIgnitesSparksCount(memberId: string): Promise<SparkStat[]> {
    const result = await executeQuery(GET_IGNITES_RECEIVED_SPARKS_QUERY, { memberId })

    if (!result) throw new Error(`Failed to execute query:${GET_IGNITES_RECEIVED_SPARKS_QUERY}`)

    return result.records.map(recordToModel)
}

async function getDonatedIgnitesSparksCount(memberId: string): Promise<SparkStat[]> {
    const result = await executeQuery(GET_IGNITES_DONATED_SPARKS_QUERY, { memberId })

    if (!result) throw new Error(`Failed to execute query:${GET_IGNITES_DONATED_SPARKS_QUERY}`)

    return result.records.map(recordToModel)
}

const memberProfileRepo: MemberProfileRepository = {
    getReceivedSparksCount,
    getDonatedSparksCount,
    getReceivedIgnitesSparksCount,
    getDonatedIgnitesSparksCount
}

export default memberProfileRepo