import {
	MemberPrivateProfile,
	MemberPublicProfile,
	MutationUpdateMemberProfileArgs,
	ProfileActivity,
	QueryPublicProfileArgs
} from 'src/generated/graphql';
import { MemberProfileUpdate } from 'src/models/member';
import ApolloContext from 'src/types/apollocontext';

export default {
	Query: {
		publicProfile: async (
			parent: any,
			args: QueryPublicProfileArgs,
			{ req, db }: ApolloContext,
			info: any
		): Promise<MemberPublicProfile | null> => {
			const memberData = await db.member.getById(args.memberId);

			if (!memberData) return null;

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
		},
		privateProfile: async (
			parent: any,
			args: any,
			{ req, db, member }: ApolloContext,
			info: any
		): Promise<MemberPrivateProfile | null> => {
			const memberData = await db.member.getById(member.id);

			if (!memberData) return null;

			const profile: MemberPrivateProfile = {
				id: memberData.id,
				membername: memberData.membername,
				firstname: memberData.firstname,
				lastname: memberData.lastname,
				birthdate: memberData.birthdate,
				profilePictureUrl: memberData.profilePictureUrl,
				coverImageUrl: memberData.coverImageUrl,
				aboutme: memberData.aboutme,
				languages: memberData.languages,
				places: memberData.places,
				website: memberData.website,
				background: memberData.background,
				interests: memberData.interests,
				knowtypes: memberData.knowtypes,
				profileActivity: {} as ProfileActivity,
				isFirstLogin: memberData.isFirstLogin
			};

			return profile;
		}
	},
	Mutation: {
		updateMemberProfile: async (
			parent: any,
			args: MutationUpdateMemberProfileArgs,
			{ req, db, member }: ApolloContext,
			info: any
		): Promise<MemberPrivateProfile | null> => {
			const memberToUpdate: MemberProfileUpdate = {
				id: member.id,
				firstname: args.profile.firstname || null,
				lastname: args.profile.lastname || null,
				birthdate: args.profile.birthdate || null,
				profilePictureUrl: args.profile.profilePictureUrl || null,
				coverImageUrl: args.profile.coverImageUrl || null,
				aboutme: args.profile.aboutme || null,
				languages: args.profile.languages || null,
				places: args.profile.places || null,
				website: args.profile.website || null,
				background: args.profile.background || null,
				interests: args.profile.interests || null,
				knowtypes: args.profile.knowtypes || null,
				isFirstLogin: args.profile.isFirstLogin === true
			};

			const memberData = await db.member.update(memberToUpdate);

			if (!memberData) return null;

			const profile: MemberPrivateProfile = {
				id: memberData.id,
				membername: memberData.membername,
				firstname: memberData.firstname,
				lastname: memberData.lastname,
				birthdate: memberData.birthdate,
				profilePictureUrl: memberData.profilePictureUrl,
				coverImageUrl: memberData.coverImageUrl,
				aboutme: memberData.aboutme,
				languages: memberData.languages,
				places: memberData.places,
				website: memberData.website,
				background: memberData.background,
				interests: memberData.interests,
				knowtypes: memberData.knowtypes,
				profileActivity: {} as ProfileActivity,
				isFirstLogin: memberData.isFirstLogin
			};

			return profile;
		}
	}
};
