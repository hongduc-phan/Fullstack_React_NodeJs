import memberResolver from '../../../../../src/api/apollo/resolvers/member';
import config from '../../../../../src/configs';
import jwt from 'jsonwebtoken';

import { AuthenticationError, UserInputError } from 'apollo-server-express';
import {
	contextMock,
	getMemberByIdMock,
	createMemberMock,
	getMemberByEmailMock,
	changeEmailMock,
	getInvitationMock
} from '../../../../../mocks/contextmock';
import {
	TEST_MEMBER_ID,
	TEST_EMAIL,
	TEST_RAW_PASSWORD,
	testMemberShortMock
} from '../../../../../mocks/testdata';
import {
	MutationChangePasswordArgs,
	MutationChangeEmailArgs
} from '../../../../../src/generated/graphql';

test('Get logged member using db.member.getById call', async () => {
	const res = await memberResolver.Query.currentMember(null, null, contextMock, null);

	if (!res) return;

	expect(res.id).toBe(TEST_MEMBER_ID);
	expect(getMemberByIdMock.mock.calls.length).toBe(1);
	expect(getMemberByIdMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
});

// test('Register new member using db.member.create call', async () => {
//     const argsMock = {
//         membername: 'testname123',
//         email: 'test@email.com',
//         password: 'test raw password',
//         firstname: 'Test',
//         lastname: 'Testino'
//     }

//     const payload = {
//         id: TEST_MEMBER_ID,
//         role: 'member',
//         name: `${argsMock.firstname} ${argsMock.lastname}`
//     }
//     const expectedToken = await jwt.sign(
//         payload,
//         config.SECRET_OR_KEY,
//         { expiresIn: '1d'})

//     const res = await memberResolver.Mutation.Register(null, argsMock, contextMock, null)

//     if(!res) return

//     expect(res.token).toBe(expectedToken)
//     expect(createMemberMock.mock.calls.length).toBe(1)
//     expect(createMemberMock.mock.calls[0][0].email).toBe(argsMock.email)
//     expect(createMemberMock.mock.calls[0][0].membername).toBe(argsMock.membername)
//     expect(createMemberMock.mock.calls[0][0].password).toBe(argsMock.password)
//     expect(createMemberMock.mock.calls[0][0].firstname).toBe(argsMock.firstname)
//     expect(createMemberMock.mock.calls[0][0].lastname).toBe(argsMock.lastname)
// })

// test('Login user with correct credentials should return token', async () => {
//     const argsMock = {
//         email: TEST_EMAIL,
//         password: TEST_RAW_PASSWORD
//     }

//     const payload = {
//         id: TEST_MEMBER_ID,
//         role: testMemberShortMock.role,
//         name: `${testMemberShortMock.firstname} ${testMemberShortMock.lastname}`
//     }
//     const expectedToken = await jwt.sign(
//         payload,
//         config.SECRET_OR_KEY,
//         { expiresIn: '3d'})

//     const res = await memberResolver.Mutation.Login(null, argsMock, contextMock, null)

//     if(!res) return

//     expect(res.token).toBe(expectedToken)
//     expect(getMemberByEmailMock.mock.calls.length).toBe(1)
//     expect(getMemberByEmailMock.mock.calls[0][0]).toBe(argsMock.email)
// })

test('Login user with not existed email should thrown AuthenticationError', async () => {
	const argsMock = {
		email: 'not_exist@email.com',
		password: TEST_RAW_PASSWORD
	};

	const getByEmailNullMock = jest.fn((x) => Promise.resolve(null));
	contextMock.db.member.getByEmail = getByEmailNullMock;

	await expect(memberResolver.Mutation.login(null, argsMock, contextMock, null)).rejects.toThrow(
		AuthenticationError
	);
	expect(getByEmailNullMock.mock.calls.length).toBe(1);
	expect(getByEmailNullMock.mock.calls[0][0]).toBe(argsMock.email);

	contextMock.db.member.getByEmail = getMemberByEmailMock;
});

test('Login user with incorrect password should thrown AuthenticationError', async () => {
	const argsMock = {
		email: TEST_EMAIL,
		password: 'incorrect password'
	};

	await expect(memberResolver.Mutation.login(null, argsMock, contextMock, null)).rejects.toThrow(
		AuthenticationError
	);
	expect(getMemberByEmailMock.mock.calls.length).toBe(1);
	expect(getMemberByEmailMock.mock.calls[0][0]).toBe(argsMock.email);
});

test('Password changing test, error when new password is empty', async () => {
	getMemberByEmailMock.mockReset();

	const args: MutationChangePasswordArgs = {
		currentPassword: TEST_RAW_PASSWORD,
		newPassword: ''
	};

	expect(memberResolver.Mutation.changePassword(null, args, contextMock, null)).rejects.toThrow(
		UserInputError
	);

	expect(getMemberByEmailMock.mock.calls.length).toBe(1);
	expect(getMemberByEmailMock.mock.calls[0][0]).toBe(TEST_EMAIL);
});

test('Password changing test, error when new current is empty', async () => {
	getMemberByEmailMock.mockReset();

	const args: MutationChangePasswordArgs = {
		currentPassword: '',
		newPassword: 'ddddddddd'
	};

	expect(memberResolver.Mutation.changePassword(null, args, contextMock, null)).rejects.toThrow(
		UserInputError
	);

	expect(getMemberByEmailMock.mock.calls.length).toBe(1);
	expect(getMemberByEmailMock.mock.calls[0][0]).toBe(TEST_EMAIL);
});

test('Password changing test, error when member doesnt exist', async () => {
	const getMemberByEmailNullMock = jest.fn((x) => Promise.resolve(null));
	contextMock.db.member.getByEmail = getMemberByEmailNullMock;

	const args: MutationChangePasswordArgs = {
		currentPassword: TEST_RAW_PASSWORD,
		newPassword: 'ddddddddd'
	};

	expect(memberResolver.Mutation.changePassword(null, args, contextMock, null)).rejects.toThrow(
		AuthenticationError
	);

	expect(getMemberByEmailMock.mock.calls.length).toBe(1);
	expect(getMemberByEmailMock.mock.calls[0][0]).toBe(TEST_EMAIL);
});

test('Email changing test', async () => {
	const args: MutationChangeEmailArgs = {
		newEmail: 'new@email.com'
	};

	const res = await memberResolver.Mutation.changeEmail(null, args, contextMock, null);

	expect(res.success).toBe(true);
	expect(changeEmailMock.mock.calls.length).toBe(1);
	expect(changeEmailMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
	expect(changeEmailMock.mock.calls[0][1]).toBe(args.newEmail);
});

test('Email changing test, error when newEmail is empty', async () => {
	const args: MutationChangeEmailArgs = {
		newEmail: ''
	};

	await expect(memberResolver.Mutation.changeEmail(null, args, contextMock, null)).rejects.toThrow(
		UserInputError
	);
});

test('Geting invitation through db.getInvitation', async () => {
	const res = await memberResolver.Query.getInvitation(null, null, contextMock, null);

	expect(getInvitationMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
	expect(getInvitationMock.mock.calls.length).toBe(1);
});
