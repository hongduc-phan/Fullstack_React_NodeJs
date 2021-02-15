import { ApolloError } from 'apollo-server-express';
import { MemberPublicProfile, ProfileActivity, SparkIgnite } from 'src/generated/graphql';
import ApolloContext from 'src/types/apollocontext';

export default {
	SparkIgnite: {
		member: async (
			parent: SparkIgnite,
			args: any,
			{ req, db }: ApolloContext,
			info: any
		): Promise<MemberPublicProfile> => {
			const memberData = await db.member.getById(parent.memberId);

			if (!memberData) throw new ApolloError('Ignites member does not exist');

			const profile: MemberPublicProfile = {
				id: memberData.id,
				membername: memberData.membername,
				firstname: memberData.firstname,
				lastname: memberData.lastname,
				profilePictureUrl: memberData.profilePictureUrl,
				coverImageUrl: memberData.coverImageUrl,
				aboutme: memberData.aboutme,
				profileActivity: {} as ProfileActivity
			};

			return profile;
		}
	}
};
