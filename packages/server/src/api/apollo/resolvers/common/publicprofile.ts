import { MemberPublicProfile, ProfileActivity } from 'src/generated/graphql';
import ApolloContext from 'src/types/apollocontext';

export default {
	MemberPublicProfile: {
		profileActivity: async (
			parent: MemberPublicProfile,
			args: any,
			{ req, db, member }: ApolloContext,
			info: any
		): Promise<ProfileActivity> => {
			return {
				receivedSparks: await db.memberprofile.getReceivedSparksCount(member.id),
				donatedSparks: await db.memberprofile.getDonatedSparksCount(member.id),
				receivedIgnitesSparks: await db.memberprofile.getReceivedIgnitesSparksCount(member.id),
				donatedIgnitesSparks: await db.memberprofile.getDonatedIgnitesSparksCount(member.id)
			} as ProfileActivity;
		}
	}
};
