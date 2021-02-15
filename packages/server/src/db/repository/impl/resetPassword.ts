import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import ResetPasswordRepository from '../interfaces/resetPassword';
import { executeQuery } from '../../neo4j/executequery';
import { ApolloError } from 'apollo-server-express';
import {
	RESET_PASSWORD_REQUEST_QUERY,
	GET_MEMBER_BY_RESET_ID_QUERY,
	SET_NEW_PASSWORD_QUERY
} from './queries/resetPassword';
import { MemberShort } from '../../../models/member';
import { resultToMemberShort } from './mappers';

async function saveResetPasswordID(memberId: string): Promise<string> {
	const result = await executeQuery(RESET_PASSWORD_REQUEST_QUERY, {
		id: uuidv4(),
		memberId
	});

	if (!result || result.records.length === 0) throw new ApolloError('Save Error.');

	return result.records[0].get('resetId');
}

async function getMemberByResetID(resetId: string): Promise<MemberShort | null> {
	const result = await executeQuery(GET_MEMBER_BY_RESET_ID_QUERY, { resetId });

	if (!result || result.records.length === 0) throw new ApolloError('Error.');

	return resultToMemberShort(result.records[0]);
}

const getHash = async (password: string) => await bcrypt.hash(password, await bcrypt.genSalt(10));

async function setNewPassword(
	resetId: string,
	memberId: string,
	password: string
): Promise<boolean> {
	const newPasswordHash = await getHash(password);
	const result = await executeQuery(SET_NEW_PASSWORD_QUERY, { resetId, memberId, newPasswordHash });

	if (!result || result.records.length === 0) throw new ApolloError('Error.');

	return true;
}

const resetPasswordRepo: ResetPasswordRepository = {
	saveResetPasswordID,
	getMemberByResetID,
	setNewPassword
};

export default resetPasswordRepo;
