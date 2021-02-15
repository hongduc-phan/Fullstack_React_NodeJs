import {
	MutationCreateSparkArgs,
	MutationCreateSparkonArgs,
	MutationAssignIgnitesArgs,
	Spark as SparkApi,
	MutationUpdateSparkArgs,
	BestFitSparksResult,
	QueryGetBestFitSparksArgs,
	QuerySparkArgs,
	QuerySparksArgs
} from 'src/generated/graphql';
import ApolloContext from 'src/types/apollocontext';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { SparkUpdateInput } from 'src/models/spark';
import Maybe from 'src/types/maybe';

async function getSparkById(
	parent: any,
	args: QuerySparkArgs,
	{ req, db }: ApolloContext,
	info: any
) {
	return await db.spark.getById(args.id);
}

async function getAllSparks(
	parent: any,
	args: QuerySparksArgs,
	{ req, db, member }: ApolloContext,
	info: any
) {
	return await db.spark.getAll(args.sparkmapId);
}

async function getBestFitSparks(
	parent: any,
	args: QueryGetBestFitSparksArgs,
	{ req, db }: ApolloContext,
	info: any
): Promise<BestFitSparksResult> {
	if (!args.sparkId) throw new UserInputError('sparkId is invalid');

	return { sparks: await db.spark.getBestFitSparks(args.sparkId) } as BestFitSparksResult;
}

async function getBestFitForProfile(
	parent: any,
	args: any,
	{ req, db, member }: ApolloContext,
	info: any
): Promise<BestFitSparksResult> {
	return { sparks: await db.spark.getBestFitForProfile(member.id) } as BestFitSparksResult;
}

export default {
	Query: {
		spark: getSparkById,
		sparks: getAllSparks,
		getBestFitSparks,
		getBestFitForProfile
	},
	Mutation: {
		createSpark: async (
			parent: any,
			args: MutationCreateSparkArgs,
			{ req, db, member }: ApolloContext,
			info: any
		): Promise<SparkApi> => {
			if (
				!args.input.title ||
				!args.input.description ||
				!args.input.body
			)
				throw new UserInputError('');

			return (await db.spark.createSpark({ ...args.input, memberId: member.id })) as SparkApi;
		},
		createSparkon: async (
			parent: any,
			args: MutationCreateSparkonArgs,
			{ req, db, member }: ApolloContext,
			info: any
		): Promise<SparkApi> => {
			if (
				!args.input.title ||
				!args.input.description ||
				!args.input.body ||
				!args.input.parentSparkId
			)
				throw new UserInputError('');

			return (await db.spark.createSparkOn({ ...args.input, memberId: member.id })) as SparkApi;
		},
		deleteSpark: async (
			parent: any,
			args: { sparkId: any },
			{ req, db }: ApolloContext,
			info: any
		) => {
			if (!args.sparkId) throw new UserInputError('');

			return await db.spark.deleteSpark(args.sparkId);
		},
		updateSpark: async (
			parent: any,
			args: MutationUpdateSparkArgs,
			{ db, member }: ApolloContext,
			info: any
		): Promise<SparkApi> => {
			if (!args.spark.id) throw new UserInputError('');

			const spark: SparkUpdateInput = {
				id: args.spark.id,
				memberId: member.id,
				title: args.spark.title || null,
				description: args.spark.description || null,
				body: args.spark.body || null,
				backgroundImage: args.spark.backgroundImage || null,
				igniteIds: args.spark.ignites || null
			};

			return (await db.spark.updateSpark(spark)) as SparkApi;
		},
		publish: async (
			parent: any,
			args: { sparkId: string },
			{ db }: ApolloContext,
			info: any
		): Promise<SparkApi> => {
			return (await db.spark.publishSpark(args.sparkId)) as SparkApi;
		},
		assignIgnites: async (
			parent: any,
			args: MutationAssignIgnitesArgs,
			{ db, member }: ApolloContext,
			info: any
		) => {
			if (!args.input.ignitesIds || !args.input.sparkId) throw new UserInputError('');

			return db.spark.assignIgnites(member.id, args.input.sparkId, args.input.ignitesIds);
		}
	}
};
