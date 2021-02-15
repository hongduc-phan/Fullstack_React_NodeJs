import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { Record as DbRecord } from 'neo4j-driver';
import { v4 as uuidv4 } from 'uuid';
import {
	CreatedMember,
	CreateMemberInput,
	Invitation,
	MemberFull,
	MemberProfileUpdate,
	MemberShort
} from '../../../models/member';
import { executeQuery } from '../../neo4j/executequery';
import MemberRepository from '../interfaces/member';
import { resultToMember, resultToMemberShort } from './mappers';
import {
	CREATE_MEMBER_QUERY,
	GET_ALL_USERS,
	GET_INVITATION_QUERY,
	GET_USER_BY_EMAIL,
	GET_USER_BY_ID,
	UPDATE_EMAIL_QUERY,
	UPDATE_MEMBER_QUERY,
	UPDATE_PASSWORD_QUERY
} from './queries/member';



const getHash = async (password: string) => await bcrypt.hash(password, await bcrypt.genSalt(10));

async function getById(id: string): Promise<MemberFull | null> {
	const result = await executeQuery(GET_USER_BY_ID, { id });

	if (result.records.length === 0) return null;

	return resultToMember(result.records[0]);
}

async function getAll(): Promise<MemberFull[]> {
	const result = await executeQuery(GET_ALL_USERS, {});
	return result.records.map(resultToMember);
}

async function getByEmail(email: string): Promise<MemberShort | null> {
	const result = await executeQuery(GET_USER_BY_EMAIL, { email });

	if (result.records.length === 0) return null;

	return resultToMemberShort(result.records[0]);
}

async function create(member: CreateMemberInput): Promise<CreatedMember> {
	const birthdateStr =
		member.birthdate instanceof Date ? member.birthdate.toISOString().slice(0, 10) : null;

	const newMember = {
		...member,
		birthdate: birthdateStr,
		id: uuidv4(),
		invitationId: uuidv4(),
		password: await getHash(member.password)
	};
	const result = await executeQuery(CREATE_MEMBER_QUERY, newMember);

	if (!result || result.records.length === 0) throw new ApolloError('Create User Error');

	return {
		id: result.records[0].get('id'),
		membername: result.records[0].get('membername'),
		email: result.records[0].get('email'),
		password: result.records[0].get('password'),
		invitationId: result.records[0].get('invitationId'),
		firstname: result.records[0].get('firstname'),
		lastname: result.records[0].get('lastname')
	};
}

async function update(member: MemberProfileUpdate): Promise<MemberFull | null> {
	const birthdateStr =
		member.birthdate instanceof Date ? member.birthdate.toISOString().slice(0, 10) : null;
	const result = await executeQuery(UPDATE_MEMBER_QUERY, { ...member, birthdate: birthdateStr });

	if (!result) throw new ApolloError('Update Member Error');

	if (result.records.length === 0) return null;

	return resultToMember(result.records[0]);
}

async function changePassword(memberId: string, newPassword: string): Promise<boolean> {
	const newPasswordHash = await getHash(newPassword);
	const result = await executeQuery(UPDATE_PASSWORD_QUERY, { memberId, newPasswordHash });

	if (!result) throw new ApolloError('Update Password Error');

	if (result.records.length === 0) return false;

	return true;
}

async function changeEmail(memberId: string, newEmail: string): Promise<boolean> {
	const result = await executeQuery(UPDATE_EMAIL_QUERY, { memberId, newEmail });

	if (!result) throw new ApolloError('Change Email Error');
	if (result.records.length === 0) return false;

	return true;
}

async function getInvitation(memberId: string): Promise<Invitation | null> {
	const result = await executeQuery(GET_INVITATION_QUERY, { memberId });

	if (!result) throw new ApolloError('Change Email Error');
	if (result.records.length === 0) return null;

	return {
		invitationId: result.records[0].get('invitationId'),
		memberId: result.records[0].get('memberId'),
		createdDatetime: new Date(result.records[0].get('createdDatetime'))
	};
}

const memberRepo: MemberRepository = {
	getById,
	getAll,
	getByEmail,
	create,
	update,
	changePassword,
	changeEmail,
	getInvitation
};

export default memberRepo;
