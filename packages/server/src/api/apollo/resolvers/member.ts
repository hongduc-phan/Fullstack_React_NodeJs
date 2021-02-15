import bcrypt from 'bcryptjs';
import config from '../../../configs';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { signOut } from '../../../auth';
import JWTPayload from 'src/types/jwtpayload';
import ApolloContext from 'src/types/apollocontext';
import {
	MutationChangeEmailArgs,
	ChangeEmailResult,
	MutationChangePasswordArgs,
	Invitation,
	MutationRegisterArgs
} from 'src/generated/graphql';

export default {
	Query: {
		currentMember: async (parent: any, args: any, { db, member }: ApolloContext, info: any) =>
			await db.member.getById(member.id),
		getInvitation: async (
			parent: any,
			args: any,
			{ db, member }: ApolloContext,
			info: any
		): Promise<Invitation | null> => await db.member.getInvitation(member.id)
	},
	Mutation: {
		register: async (
			parent: any,
			args: MutationRegisterArgs,
			{ req, db, services }: ApolloContext,
			info: any
		) => {
			const newMember = await db.member.create(args.input);

			const payload: JWTPayload = {
				id: newMember.id,
				membername: newMember.membername,
				email: newMember.email
			};

			const token = await jwt.sign(payload, config.SECRET_OR_KEY || '', { expiresIn: '1d' });

			services.emailSender.sendRegistrationFinisgedEmail(newMember);

			return { token };
		},
		login: async (parent: any, { email, password }: any, { req, db }: ApolloContext, info: any) => {
			const member = await db.member.getByEmail(email);
			if (!member) throw new AuthenticationError('');

			if (!(await bcrypt.compare(password, member.password))) throw new AuthenticationError('');

			const payload: JWTPayload = {
				id: member.id,
				membername: member.membername,
				email: member.email
			};
			const token = await jwt.sign(payload, config.SECRET_OR_KEY || '', { expiresIn: '1d' });

			return { token };
		},
		logout: (parent: any, args: any, { req, res }: ApolloContext, info: any) => {
			return signOut(req, res);
		},
		changePassword: async (
			parent: any,
			{ currentPassword, newPassword }: MutationChangePasswordArgs,
			{ db, member }: ApolloContext,
			info: any
		) => {
			const m = await db.member.getByEmail(member.email);

			if (!currentPassword || !newPassword)
				throw new UserInputError('currentPassword or newPassword are empty');

			if (!m) throw new AuthenticationError('');

			if (!(await bcrypt.compare(currentPassword, m.password))) throw new AuthenticationError('');

			return db.member.changePassword(member.id, newPassword);
		},
		changeEmail: async (
			parent: any,
			args: MutationChangeEmailArgs,
			{ db, member }: ApolloContext,
			info: any
		): Promise<ChangeEmailResult> => {
			if (!args.newEmail) throw new UserInputError('newEmail is empty');

			const res: ChangeEmailResult = {
				success: await db.member.changeEmail(member.id, args.newEmail)
			};

			return res;
		}
	}
};
