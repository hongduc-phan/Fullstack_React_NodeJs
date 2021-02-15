import { v4 as uuidv4 } from 'uuid'
import { ApolloError } from 'apollo-server-express'
import context from '../../context'
import { Sparkmap } from 'src/models/sparkmap'
import SparkmapRepository from '../interfaces/sparkmap'
import {
    GET_BY_ID_QUERY,
    GET_SPARKSMAPS_QUERY,
    GET_BY_SPARK_ID_QUERY } from './queries/sparkmap'
import { executeQuery } from '../../neo4j/executequery'

const driver = context().driver

async function getById(id: string): Promise<Sparkmap | null> {
    const session = driver.session();
    try {
            const result = await session.run(GET_BY_ID_QUERY, { id })

            if (result.records.length === 0) return null

            return { id: result.records[0].get('id') }

    } finally {
        await session.close()
    }
}

async function getAll(memberId: string): Promise<Sparkmap[] | null> {
    const result = await executeQuery(GET_SPARKSMAPS_QUERY, { memberId })
    return result.records.map(r => ({ id: r.get('id') }))
}

async function getSparkmapBySparkId(sparkId: string): Promise<Sparkmap | null> {
    const session = driver.session();
    try {
            const result = await session.run(GET_BY_SPARK_ID_QUERY, { sparkId })

            if (result.records.length === 0) return null

            return { id: result.records[0].get('id') }

    } finally {
        await session.close()
    }
}

export default {
    getById,
    getAll,
    getSparkmapBySparkId
} as SparkmapRepository