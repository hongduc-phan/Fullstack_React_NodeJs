import ApolloContext from 'src/types/apollocontext';
import {
    MutationResetPasswordArgs, MutationCheckResetIdArgs, MutationSetNewPasswordArgs
} from 'src/generated/graphql';
import { UserInputError } from 'apollo-server-express';
import getLogger from '../../../logger';

const logger = getLogger()

async function resetPassword(
	parent: any,
	args: MutationResetPasswordArgs,
	{ services, db }: ApolloContext,
	info: any
): Promise<boolean> {
	if (!args.email) throw new UserInputError('Email is invalid');

    const member = await db.member.getByEmail(args.email)
    if (!member) return true

    logger.info(`${args.email} has been found. Proceed with password recovery.`)

    const resetId = await db.resetPassword.saveResetPasswordID(member.id)

    await services.emailSender.sendResetPasswordLink(member.email, resetId)

	return true;
}

async function checkResetID(
	parent: any,
	args: MutationCheckResetIdArgs,
	{ services, db }: ApolloContext,
	info: any
): Promise<boolean> {
	if (!args.resetId) throw new UserInputError('Reset ID is invalid');

	const member = await db.resetPassword.getMemberByResetID(args.resetId)
	if (!member) return false

	logger.info(`ResetID ${args.resetId} has been found.`)

	return true;
}

async function setNewPassword(
	parent: any,
	args: MutationSetNewPasswordArgs,
	{ services, db }: ApolloContext,
	info: any
): Promise<boolean> {
	if (!args.resetId) throw new UserInputError('Reset ID is invalid');
	if (!args.password) throw new UserInputError('Password is invalid');

	const member = await db.resetPassword.getMemberByResetID(args.resetId)
	if (!member) return false

	logger.info(`ResetID ${args.resetId} has been found. Proceed with password setting.`)

	return await db.resetPassword.setNewPassword(args.resetId, member.id, args.password)
}

export default {
	Mutation: {
		resetPassword,
		checkResetID,
		setNewPassword
	}
};

