import { v4 as uuidv4 } from 'uuid';
import { ApolloError } from 'apollo-server-express';
import {
	Spark,
	CreateSparkInput,
	CreateSparkOnInput,
	SparkIgnite,
	SparkUpdateInput
} from 'src/models/spark';
import SparkRepository from '../interfaces/spark';
import {
	GET_SINGLE_SPARK_QUERY,
	GET_SPARKS_BY_MAP_QUERY,
	CREATE_SPARK_QUERY,
	DELETE_SPARK_QUERY,
	GET_CHILDREN_QUERY,
	GET_PARENT_BY_CHILD_QUERY,
	UPDATE_SPARK_QUERY,
	PUBLISH_SPARK_QUERY,
	CREATE_SPARK_ON_QUERY,
	CREATE_SPARK_IGNITE_QUERY,
	GET_SPARK_IGNITES_QUERY,
	DELETE_SPARK_IGNITES_QUERY,
	GET_ALL_SPARKS_QUERY,
	GET_BEST_FIT_SPARKS, GET_BEST_FIT_FOR_PROFILE
} from './queries/spark';
import { executeQuery, executeQueryList, ExecuteParameter } from '../../neo4j/executequery';
import { resultToMember, sparkRecordToSpark } from './mappers';
import Maybe from 'src/types/maybe';
import { MemberFull } from 'src/models/member';
import { GET_TOP_PARTICIPANTS_FOR_SPARK } from './queries/member';

async function getById(id: string): Promise<Spark | null> {
	const result = await executeQuery(GET_SINGLE_SPARK_QUERY, { id });

	if (result.records.length === 0) return null;

	return sparkRecordToSpark(result.records[0]);
}

async function getAll(sparkmapId: Maybe<string>): Promise<Spark[] | null> {
	const query = sparkmapId ? GET_SPARKS_BY_MAP_QUERY : GET_ALL_SPARKS_QUERY;
	const result = await executeQuery(query, { sparkmapId });
	return result.records.map(sparkRecordToSpark);
}

async function createSpark(args: CreateSparkInput): Promise<Spark> {
	const newSpark = {
		id: uuidv4(),
		title: args.title,
		description: args.description,
		body: args.body,
		memberId: args.memberId,
		sparkmapId: uuidv4(),
		isDraft: true,
		backgroundImage: args.backgroundImage || ''
	};

	let queries: ExecuteParameter[] = [
		{
			query: CREATE_SPARK_QUERY,
			parameters: newSpark
		}
	];

	if (args.ignites && args.ignites.length > 0) {
		queries = [
			...queries,
			...args.ignites.map((ignite) => ({
				query: CREATE_SPARK_IGNITE_QUERY,
				parameters: {
					igniteId: ignite,
					memberId: newSpark.memberId,
					sparkId: newSpark.id
				}
			}))
		];
	}

	const result = await executeQueryList(queries);

	if (!result || result.length === 0) throw new ApolloError('Spark creation error.');

	return sparkRecordToSpark(result[0].records[0]);
}

async function createSparkOn(args: CreateSparkOnInput): Promise<Spark> {
	const newSparkOn = {
		id: uuidv4(),
		title: args.title,
		description: args.description,
		body: args.body,
		memberId: args.memberId,
		parentSparkId: args.parentSparkId,
		isDraft: true,
		backgroundImage: args.backgroundImage || ''
	};

	let queries: ExecuteParameter[] = [
		{
			query: CREATE_SPARK_ON_QUERY,
			parameters: newSparkOn
		}
	];

	if (args.ignites && args.ignites.length > 0) {
		queries = [
			...queries,
			...args.ignites.map((ignite) => ({
				query: CREATE_SPARK_IGNITE_QUERY,
				parameters: {
					igniteId: ignite,
					memberId: newSparkOn.memberId,
					sparkId: newSparkOn.id
				}
			}))
		];
	}

	const result = await executeQueryList(queries);

	if (!result || result.length === 0) throw new ApolloError('Spark creation error.');

	return sparkRecordToSpark(result[0].records[0]);
}

async function deleteSpark(sparkId: string): Promise<Spark | null> {
	const result = await executeQuery(DELETE_SPARK_QUERY, { sparkId });

	if (!result) throw new ApolloError('Spark deletion error.');

	if (result.records.length === 0) return null;

	return sparkRecordToSpark(result.records[0]);
}

async function getChildrenByParentId(parentId: string): Promise<Spark[] | null> {
	const result = await executeQuery(GET_CHILDREN_QUERY, { parentId });

	return result.records.map(sparkRecordToSpark);
}

async function getParentByChildId(childId: string): Promise<Spark | null> {
	const result = await executeQuery(GET_PARENT_BY_CHILD_QUERY, { childId });

	if (result.records.length === 0) return null;

	return sparkRecordToSpark(result.records[0]);
}

async function updateSpark(spark: SparkUpdateInput): Promise<Spark> {
	const queries: ExecuteParameter[] = [
		{
			query: UPDATE_SPARK_QUERY,
			parameters: spark
		},
		{
			query: DELETE_SPARK_IGNITES_QUERY,
			parameters: { memberId: spark.memberId, sparkId: spark.id }
		}
	].concat(
		spark.igniteIds?.map((igniteId) => ({
			query: CREATE_SPARK_IGNITE_QUERY,
			parameters: { memberId: spark.memberId, sparkId: spark.id, igniteId }
		})) || []
	);

	const result = await executeQueryList(queries);

	if (!result || result.length === 0) throw new ApolloError('Spark updating error.');

	return sparkRecordToSpark(result[0].records[0]);
}

async function publishSpark(sparkId: string): Promise<Spark | null> {
	const result = await executeQuery(PUBLISH_SPARK_QUERY, { sparkId });

	if (!result) throw new ApolloError('Spark publishing error.');

	if (result.records.length === 0) return null;

	return sparkRecordToSpark(result.records[0]);
}

async function getSparkIgnites(sparkId: string): Promise<SparkIgnite[] | null> {
	const result = await executeQuery(GET_SPARK_IGNITES_QUERY, { sparkId });

	if (!result) throw new ApolloError('Getting ignites error.');

	if (result.records.length === 0) return null;

	return result.records.map((r) => ({ igniteId: r.get('igniteId'), memberId: r.get('memberId') }));
}

async function assignIgnites(
	memberId: string,
	sparkId: string,
	ignitesIds: string[]
): Promise<SparkIgnite[]> {
	const queries = [
		{
			query: DELETE_SPARK_IGNITES_QUERY,
			parameters: { memberId, sparkId }
		}
	].concat(
		ignitesIds.map((ig) => ({
			query: CREATE_SPARK_IGNITE_QUERY,
			parameters: { memberId, sparkId, igniteId: ig }
		}))
	);

	const result = await executeQueryList(queries);

	if (!result || result.length === 0) throw new ApolloError('Assign ignites error.');

	const res = result.length === 1 ? result : result.slice(1);

	return res.flatMap((r) =>
		r.records.map((ir) => ({
			igniteId: ir.get('igniteId'),
			memberId: ir.get('memberId')
		}))
	);
}

async function getBestFitSparks(sparkId: string): Promise<Maybe<Spark[]>> {
	const result = await executeQuery(GET_BEST_FIT_SPARKS, { sparkId });

	if (!result) throw new ApolloError('getBestFitSparks error.');

	return result.records.map(sparkRecordToSpark);
}

async function topParticipantsForSpark(sparkId: string): Promise<Maybe<MemberFull[]>> {
	const result = await executeQuery(GET_TOP_PARTICIPANTS_FOR_SPARK, { sparkId });

	if (!result) throw new ApolloError('Get topParticipants error.');

	return result.records.map(resultToMember);
}

async function getBestFitForProfile(memberId: string): Promise<Maybe<Spark[]>> {
	const result = await executeQuery(GET_BEST_FIT_FOR_PROFILE, { memberId });

	if (!result) throw new ApolloError('getBestFitForProfile error.');

	return result.records.map(sparkRecordToSpark);
}

export default {
	getById,
	getAll,
	createSpark,
	createSparkOn,
	deleteSpark,
	getChildrenByParentId,
	getParentByChildId,
	updateSpark,
	publishSpark,
	getSparkIgnites,
	assignIgnites,
	getBestFitSparks,
	topParticipantsForSpark,
	getBestFitForProfile
} as SparkRepository;
