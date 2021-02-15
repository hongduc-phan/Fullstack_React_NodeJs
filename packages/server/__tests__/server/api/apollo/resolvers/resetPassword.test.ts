import resetPasswordResolver from '../../../../../src/api/apollo/resolvers/resetPassword';
import {
	TEST_EMAIL,
	testMemberShortMock,
	TEST_NOT_EXISTED_EMAIL,
	TEST_RESET_PASSWORD_ID,
	TEST_NOT_EXISTED_RESET_ID,
	TEST_RAW_PASSWORD
} from '../../../../../mocks/testdata';
import {
	contextMock,
	getMemberByEmailMock,
	saveResetPasswordIDMock,
	sendResetPasswordLinkMock,
	getMemberByResetIDMock,
	setNewPasswordMock
} from '../../../../../mocks/contextmock';
import {
	MutationResetPasswordArgs,
	MutationCheckResetIdArgs,
	MutationSetNewPasswordArgs
} from '../../../../../src/generated/graphql';
import { UserInputError } from 'apollo-server-express';

test('ResetPassword is called. Member exists.', async () => {
	const argsMock = { email: TEST_EMAIL } as MutationResetPasswordArgs;
	const res = await resetPasswordResolver.Mutation.resetPassword(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).toBe(true);

	expect(getMemberByEmailMock.mock.calls.length).toBe(1);
	expect(getMemberByEmailMock.mock.calls[0][0]).toBe(argsMock.email);

	expect(saveResetPasswordIDMock.mock.calls.length).toBe(1);
	expect(saveResetPasswordIDMock.mock.calls[0][0]).toBe(testMemberShortMock.id);

	expect(sendResetPasswordLinkMock.mock.calls.length).toBe(1);
	expect(sendResetPasswordLinkMock.mock.calls[0][0]).toBe(argsMock.email);
});

test('ResetPassword is called. Member doesnt exists.', async () => {
	getMemberByEmailMock.mockReset();
	saveResetPasswordIDMock.mockReset();
	sendResetPasswordLinkMock.mockReset();

	const argsMock = { email: TEST_NOT_EXISTED_EMAIL } as MutationResetPasswordArgs;
	const res = await resetPasswordResolver.Mutation.resetPassword(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).toBe(true);

	expect(getMemberByEmailMock.mock.calls.length).toBe(1);
	expect(getMemberByEmailMock.mock.calls[0][0]).toBe(argsMock.email);

	expect(saveResetPasswordIDMock.mock.calls.length).toBe(0);
	expect(sendResetPasswordLinkMock.mock.calls.length).toBe(0);
});

test('Check If resetId exists. Member exists.', async () => {
	const argsMock = { resetId: TEST_RESET_PASSWORD_ID } as MutationCheckResetIdArgs;
	const res = await resetPasswordResolver.Mutation.checkResetID(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).toBe(true);

	expect(getMemberByResetIDMock.mock.calls.length).toBe(1);
	expect(getMemberByResetIDMock.mock.calls[0][0]).toBe(argsMock.resetId);
});

test('Check If resetId exists. Member doesnot exists.', async () => {
	getMemberByResetIDMock.mockReset()

	const argsMock = { resetId: TEST_NOT_EXISTED_RESET_ID } as MutationCheckResetIdArgs;
	const res = await resetPasswordResolver.Mutation.checkResetID(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).toBe(false);

	expect(getMemberByResetIDMock.mock.calls.length).toBe(1);
	expect(getMemberByResetIDMock.mock.calls[0][0]).toBe(argsMock.resetId);
});

test('Check If resetId exists. Error if resetId is empty.', async () => {
	const argsMock = { resetId: '' } as MutationCheckResetIdArgs;

	await expect(
		resetPasswordResolver.Mutation.checkResetID(null, argsMock, contextMock, null)
	).rejects.toThrow(UserInputError);
});

test('Set New password. Member exists.', async () => {
	getMemberByResetIDMock.mockReset()

	const argsMock = {
		resetId: TEST_RESET_PASSWORD_ID,
		password: TEST_RAW_PASSWORD
	} as MutationSetNewPasswordArgs;
	const res = await resetPasswordResolver.Mutation.setNewPassword(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).toBe(true);

	expect(getMemberByResetIDMock.mock.calls.length).toBe(1);
	expect(getMemberByResetIDMock.mock.calls[0][0]).toBe(argsMock.resetId);

	expect(setNewPasswordMock.mock.calls.length).toBe(1);
	expect(setNewPasswordMock.mock.calls[0][0]).toBe(argsMock.resetId)
	expect(setNewPasswordMock.mock.calls[0][1]).toBe(testMemberShortMock.id)
	expect(setNewPasswordMock.mock.calls[0][2]).toBe(TEST_RAW_PASSWORD)
});

test('Set New password. Member doesnt exist.', async () => {
	getMemberByResetIDMock.mockReset()

	const argsMock = {
		resetId: TEST_NOT_EXISTED_RESET_ID,
		password: TEST_RAW_PASSWORD
	} as MutationSetNewPasswordArgs;
	const res = await resetPasswordResolver.Mutation.setNewPassword(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).toBe(false);

	expect(getMemberByResetIDMock.mock.calls.length).toBe(1);
	expect(getMemberByResetIDMock.mock.calls[0][0]).toBe(argsMock.resetId);
});

test('Set New password. Error if resetId is empty.', async () => {
	const argsMock = {
		resetId: '',
		password: TEST_RAW_PASSWORD
	} as MutationSetNewPasswordArgs;

	await expect(
		resetPasswordResolver.Mutation.setNewPassword(null, argsMock, contextMock, null)
	).rejects.toThrow(UserInputError);
});

test('Set New password. Error if password is empty.', async () => {
	const argsMock = {
		resetId: TEST_RESET_PASSWORD_ID,
		password: ''
	} as MutationSetNewPasswordArgs;

	await expect(
		resetPasswordResolver.Mutation.setNewPassword(null, argsMock, contextMock, null)
	).rejects.toThrow(UserInputError);
});
