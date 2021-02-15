import {
	Ignite,
	MemberPublicProfile,
	ProfileActivity,
	Spark,
	SparkIgnite
} from 'src/generated/graphql';
import ApolloContext from 'src/types/apollocontext';
import Maybe from 'src/types/maybe';

export default {
	Spark: {
		children: async (parent: { id: any }, args: any, { req, db }: ApolloContext, info: any) => {
			return await db.spark.getChildrenByParentId(parent.id);
		},
		parent: async (parent: { id: any }, args: any, { req, db }: ApolloContext, info: any) => {
			return await db.spark.getParentByChildId(parent.id);
		},
		member: async (
			parent: Spark,
			args: any,
			{ dataloader, member, db }: ApolloContext,
			info: any
		) => {
			return await dataloader.memberDataLoader.getById(parent.memberId);
		},
		sparkmap: async (parent: { id: any }, args: any, { req, db }: ApolloContext, info: any) => {
			return await db.sparkmap.getSparkmapBySparkId(parent.id);
		},
		ignites: async (
			parent: { id: any },
			args: any,
			{ db, services }: ApolloContext,
			info: any
		): Promise<SparkIgnite[] | null> => {
			const sparkIgnites = await db.spark.getSparkIgnites(parent.id);

			if (!sparkIgnites) return null;

			return sparkIgnites.map(
				(si) =>
					({
						igniteId: si.igniteId,
						memberId: si.memberId,
						igniteGroupId: services.ignites.getGroupByIgnite(si.igniteId)
					} as SparkIgnite)
			);
		},
		topParticipants: async (
			parent: { id: any },
			args: any,
			{ db, services }: ApolloContext,
			info: any
		): Promise<Maybe<MemberPublicProfile[]>> => {
			return (await db.spark.topParticipantsForSpark(parent.id))?.map((memberData) => ({
				id: memberData.id,
				membername: memberData.membername,
				firstname: memberData.firstname,
				lastname: memberData.lastname,
				profilePictureUrl: memberData.profilePictureUrl,
				coverImageUrl: memberData.coverImageUrl,
				aboutme: memberData.aboutme,
				profileActivity: {} as ProfileActivity
			}));
		},
		topIgnites: async (
			parent: { id: any },
			args: any,
			{ db, services }: ApolloContext,
			info: any
		): Promise<Maybe<Ignite[]>> => {
			return (await await db.ignite.getTopIgnitesForSpark(parent.id)).map((i) => ({
				...i,
				id: i.igniteId
			}));
		}
	}
};
