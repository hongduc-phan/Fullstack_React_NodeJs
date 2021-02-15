import { v4 as uuidv4 } from 'uuid';
import RegistrationRepository from '../interfaces/registration';
import { EmailVerificationCode, NameCheckResult } from 'src/models/registration';
import { SAVE_EMAIL_VERIFY_CODE, SET_EMAIL_VERIFIED, GET_MEMBERNAME_OR_EMAIL_QUERY } from './queries/registration';
import { executeQuery } from '../../neo4j/executequery';
import { ApolloError } from 'apollo-server-express';

async function saveEmailVerificationCode(
	code: string,
	email: string
): Promise<EmailVerificationCode> {
	const result = await executeQuery(SAVE_EMAIL_VERIFY_CODE, {
		id: uuidv4(),
		code,
		email
	});

	if (!result || result.records.length === 0) throw new ApolloError('Save Code Error.');

	const ret: EmailVerificationCode = {
		id: result.records[0].get('id'),
		code: result.records[0].get('code'),
		email: result.records[0].get('email'),
		verified: result.records[0].get('verified'),
		createdDatetime: new Date(result.records[0].get('createdDatetime')),
		updatedDatetime: new Date(result.records[0].get('updatedDatetime'))
	};

	return ret;
}

async function verifyCode(code:string, email:string): Promise<boolean> {
	const result = await executeQuery(SET_EMAIL_VERIFIED, {
		code,
		email
	});

	return result.records.length !== 0
}

async function checkMembername(membername: string, email: string): Promise<NameCheckResult> {
	const result = await executeQuery(GET_MEMBERNAME_OR_EMAIL_QUERY, {
		membername,
		email
	});

	if (!result || result.records.length === 0) throw new ApolloError('Check Membername error.');

	return {
		membernameExists: !!result.records[0].get('membername'),
		emailExists: !!result.records[0].get('email'),
	}
}

const registrationRepo: RegistrationRepository = {
	saveEmailVerificationCode,
	verifyCode,
	checkMembername
};

export default registrationRepo;
