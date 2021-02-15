import ApolloContext from 'src/types/apollocontext';
import {
	MutationCreateEmailVerificationCodeArgs,
	MutationVerifyCodeArgs,
	NameCheckResult,
	MutationCheckMembernameArgs
} from 'src/generated/graphql';
import { UserInputError } from 'apollo-server-express';

async function createEmailVerificationCode(
	parent: any,
	args: MutationCreateEmailVerificationCodeArgs,
	{ services, db }: ApolloContext,
	info: any
): Promise<boolean> {
	if (!args.email) throw new UserInputError('Email is invalid');

	const code = await services.emailSender.sendVerificationCode(args.email);

	// store to DB
	await db.registration.saveEmailVerificationCode(code, args.email);

	return true;
}

async function verifyCode(
	parent: any,
	args: MutationVerifyCodeArgs,
	{ db, member }: ApolloContext,
	info: any
): Promise<boolean> {
	if (!args.code) throw new UserInputError('Code is invalid');
	if (!args.email) throw new UserInputError('Email is invalid');

	return db.registration.verifyCode(args.code, args.email);
}

async function checkMembername(
	parent: any,
	args: MutationCheckMembernameArgs,
	{ db, member }: ApolloContext,
	info: any
): Promise<NameCheckResult> {
	if (!args.membername) throw new UserInputError('Membername is invalid');
	if (!args.email) throw new UserInputError('Email is invalid');

	return db.registration.checkMembername(args.membername, args.email);
}

export default {
	Mutation: {
		createEmailVerificationCode,
		verifyCode,
		checkMembername
	}
};
