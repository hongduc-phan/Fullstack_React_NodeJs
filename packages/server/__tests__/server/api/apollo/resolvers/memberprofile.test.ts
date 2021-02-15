import memberprofileResolver from '../../../../../src/api/apollo/resolvers/memberprofile';
import publicprofileResolver from '../../../../../src/api/apollo/resolvers/common/publicprofile';
import {
	MutationUpdateMemberProfileArgs,
	QueryPublicProfileArgs
} from '../../../../../src/generated/graphql';
import {
	TEST_MEMBER_ID,
	testMemberProfileUpdateInput,
	testMemberFullMock,
	testMemberProfile
} from '../../../../../mocks/testdata';
import {
	contextMock,
	getMemberByIdMock,
	updateMemberMock,
	getReceivedSparksCountMock,
	getDonatedSparksCountMock,
	getReceivedIgnitesSparksCountMock,
	getDonatedIgnitesSparksCountMock
} from '../../../../../mocks/contextmock';

test('Get public profile of member using db.member.getById call', async () => {
	const args = { memberId: TEST_MEMBER_ID } as QueryPublicProfileArgs;

	const res = await memberprofileResolver.Query.publicProfile(null, args, contextMock, null);

	if (!res) return;

	expect(res.membername).toBe(testMemberFullMock.membername);
	expect(getMemberByIdMock.mock.calls.length).toBe(1);
	expect(getMemberByIdMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
});

test('Get public profile if getById returns null', async () => {
	const getMemberByIdNullMock = jest.fn((x) => Promise.resolve(null));

	contextMock.db.member.getById = getMemberByIdNullMock;

	const args = { memberId: TEST_MEMBER_ID } as QueryPublicProfileArgs;

	const res = await memberprofileResolver.Query.publicProfile(null, args, contextMock, null);

	expect(res).toBeNull();
});

test('Get private profile of member using db.member.getById call', async () => {
	getMemberByIdMock.mockReset();

	const res = await memberprofileResolver.Query.privateProfile(null, null, contextMock, null);

	if (!res) return;

	expect(res.membername).toBe(testMemberFullMock.membername);
	expect(getMemberByIdMock.mock.calls.length).toBe(1);
	expect(getMemberByIdMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
});

test('Get private profile if getById returns null', async () => {
	const getMemberByIdNullMock = jest.fn((x) => Promise.resolve(null));

	contextMock.db.member.getById = getMemberByIdNullMock;

	const res = await memberprofileResolver.Query.privateProfile(null, null, contextMock, null);

	expect(res).toBeNull();
});

test('Update profile of member using db.member.update call', async () => {
	const args = { profile: testMemberProfileUpdateInput } as MutationUpdateMemberProfileArgs;

	const res = await memberprofileResolver.Mutation.updateMemberProfile(
		null,
		args,
		contextMock,
		null
	);

	if (!res) return;

	expect(res.membername).toBe(testMemberFullMock.membername);
	expect(updateMemberMock.mock.calls.length).toBe(1);
	expect(updateMemberMock.mock.calls[0][0].id).toBe(TEST_MEMBER_ID);
});

test('db.memberprofile.sparkStat is called if sparkStat is requested', async () => {
	const args = { profile: testMemberProfileUpdateInput } as MutationUpdateMemberProfileArgs;

	const res = await publicprofileResolver.MemberPublicProfile.profileActivity(
		testMemberProfile,
		args,
		contextMock,
		null
	);

	if (!res) return;

	expect(getReceivedSparksCountMock.mock.calls.length).toBe(1);
	expect(getReceivedSparksCountMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);

	expect(getDonatedSparksCountMock.mock.calls.length).toBe(1);
	expect(getDonatedSparksCountMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);

	expect(getReceivedIgnitesSparksCountMock.mock.calls.length).toBe(1);
	expect(getReceivedIgnitesSparksCountMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);

	expect(getDonatedIgnitesSparksCountMock.mock.calls.length).toBe(1);
	expect(getDonatedIgnitesSparksCountMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
});
