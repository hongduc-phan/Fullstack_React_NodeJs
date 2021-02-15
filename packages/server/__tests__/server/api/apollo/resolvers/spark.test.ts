import sparkResolver from '../../../../../src/api/apollo/resolvers/spark';
import sparkCommonResolver from '../../../../../src/api/apollo/resolvers/common/spark';
import {
	TEST_SPARKMAP_ID,
	TEST_SPARK_ID,
	testSpark,
	TEST_MEMBER_ID,
	testParentSpark,
	TEST_PARENT_ID,
	testMemberFullMock
} from '../../../../../mocks/testdata';
import {
	contextMock,
	getSparkAllMock,
	getSparkByIdMock,
	createSparkMock,
	createSparkOnMock,
	deleteSparkMock,
	getSparkChildrenByParentIdMock,
	getSparkParentByChildIdMock,
	assignIgnitesMock,
	getMemberByIdMock,
	getSparkIgnitesMock,
	getGroupByIgniteMock,
	topParticipantsForSparkMock,
	getTopIgnitesForSparkMock,
	getBestFitSparksMock,
	getBestFitForProfileMock
} from '../../../../../mocks/contextmock';
import {
	MutationCreateSparkArgs,
	MutationCreateSparkonArgs,
	MutationAssignIgnitesArgs,
	Spark,
	Member,
	Sparkmap,
	QueryGetBestFitSparksArgs
} from '../../../../../src/generated/graphql';
import { UserInputError } from 'apollo-server-express';

test('Get All sparks using db.getAll call', async () => {
	const argsMock = { sparkmapId: TEST_SPARKMAP_ID };

	const res = await sparkResolver.Query.sparks(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(res[0].id).toBe(TEST_SPARK_ID);
	expect(res[0].backgroundImage).toBe(testSpark.backgroundImage);
	expect(getSparkAllMock.mock.calls.length).toBe(1);
	expect(getSparkAllMock.mock.calls[0][0]).toBe(argsMock.sparkmapId);
});

test('Get Single spark using db.getById call', async () => {
	const argsMock = { id: TEST_SPARK_ID };

	const res = await sparkResolver.Query.spark(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.id).toBe(argsMock.id);
	expect(res.backgroundImage).toBe(testSpark.backgroundImage);
	expect(getSparkByIdMock.mock.calls.length).toBe(1);
	expect(getSparkByIdMock.mock.calls[0][0]).toBe(argsMock.id);
});

test('Create spark using db.create call', async () => {
	const argsMock: MutationCreateSparkArgs = {
		input: {
			title: 'test title',
			description: 'test description',
			body: 'test body',
			backgroundImage: 'http://node1.cdn-provider1.com/images_store/12345/67890_image1.jpg'
		}
	};

	const res = await sparkResolver.Mutation.createSpark(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.title).toBe(argsMock.input.title);
	expect(res.description).toBe(argsMock.input.description);
	expect(res.body).toBe(argsMock.input.body);
	expect(res.backgroundImage).toBe(argsMock.input.backgroundImage);

	expect(createSparkMock.mock.calls.length).toBe(1);
	expect(createSparkMock.mock.calls[0][0].title).toBe(argsMock.input.title);
	expect(createSparkMock.mock.calls[0][0].description).toBe(argsMock.input.description);
	expect(createSparkMock.mock.calls[0][0].body).toBe(argsMock.input.body);
	expect(createSparkMock.mock.calls[0][0].memberId).toBe(TEST_MEMBER_ID);
	expect(createSparkMock.mock.calls[0][0].backgroundImage).toBe(argsMock.input.backgroundImage);
});

test('Create spark as child of other using db.create call', async () => {
	const argsMock: MutationCreateSparkonArgs = {
		input: {
			title: 'test title',
			description: 'test description',
			body: 'test body',
			backgroundImage: 'http://node1.cdn-provider1.com/images_store/12345/67890_image1.jpg',
			parentSparkId: TEST_SPARK_ID
		}
	};

	const res = await sparkResolver.Mutation.createSparkon(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.title).toBe(argsMock.input.title);
	expect(res.description).toBe(argsMock.input.description);
	expect(res.body).toBe(argsMock.input.body);
	expect(res.backgroundImage).toBe(argsMock.input.backgroundImage);

	expect(createSparkOnMock.mock.calls.length).toBe(1);
	expect(createSparkOnMock.mock.calls[0][0].title).toBe(argsMock.input.title);
	expect(createSparkOnMock.mock.calls[0][0].description).toBe(argsMock.input.description);
	expect(createSparkOnMock.mock.calls[0][0].body).toBe(argsMock.input.body);
	expect(createSparkOnMock.mock.calls[0][0].memberId).toBe(TEST_MEMBER_ID);
	expect(createSparkOnMock.mock.calls[0][0].parentSparkId).toBe(TEST_SPARK_ID);
	expect(createSparkOnMock.mock.calls[0][0].backgroundImage).toBe(argsMock.input.backgroundImage);
});

test('Delete spark using db.spark.deleteSpark call', async () => {
	const argsMock = {
		sparkId: TEST_SPARK_ID
	};

	const res = await sparkResolver.Mutation.deleteSpark(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res).not.toBeNull();
	expect(res.id).toBe(TEST_SPARK_ID);
	expect(deleteSparkMock.mock.calls.length).toBe(1);
	expect(deleteSparkMock.mock.calls[0][0]).toBe(TEST_SPARK_ID);
});

test('Get Children sparksusing db.getChildrenByParentId call', async () => {
	const argsMock = { sparkmap: TEST_SPARKMAP_ID };

	const res = await sparkCommonResolver.Spark.children(
		testParentSpark,
		argsMock,
		contextMock,
		null
	);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(res[0].id).toBe(TEST_SPARK_ID);
	expect(res[0].backgroundImage).toBe(testSpark.backgroundImage);
	expect(getSparkChildrenByParentIdMock.mock.calls.length).toBe(1);
	expect(getSparkChildrenByParentIdMock.mock.calls[0][0]).toBe(TEST_PARENT_ID);
});

test('Get Parent spark by childId using db.getParentByChildId call', async () => {
	const argsMock = { id: TEST_SPARK_ID };

	const res = await sparkCommonResolver.Spark.parent(testParentSpark, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.id).toBe(testParentSpark.id);
	expect(res.backgroundImage).toBe(testParentSpark.backgroundImage);
	expect(getSparkParentByChildIdMock.mock.calls.length).toBe(1);
	expect(getSparkParentByChildIdMock.mock.calls[0][0]).toBe(testParentSpark.id);
});

test('Get Member by spark using db.getMemberBySparkId call', async () => {
	const argsMock = { id: TEST_SPARK_ID };

	const res = await sparkCommonResolver.Spark.member(
		{
			...testParentSpark,
			member: {} as Member,
			sparkmap: {} as Sparkmap
		} as Spark,
		argsMock,
		contextMock,
		null
	);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.id).toBe(testMemberFullMock.id);

	expect(getMemberByIdMock.mock.calls.length).toBe(1);
	expect(getMemberByIdMock.mock.calls[0][0]).toBe(testParentSpark.memberId);
});

test('Get Spark ignites using db.spark.getSparkIgnites call', async () => {
	const res = await sparkCommonResolver.Spark.ignites(testSpark, null, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(getSparkIgnitesMock.mock.calls.length).toBe(1);
	expect(getSparkIgnitesMock.mock.calls[0][0]).toBe(testSpark.id);
	expect(getGroupByIgniteMock.mock.calls.length).toBe(2);
});

test('Assign ignites using db.spark.assignIgnites call', async () => {
	const argsMock: MutationAssignIgnitesArgs = {
		input: { sparkId: TEST_SPARK_ID, ignitesIds: ['ignite1', 'ignite2'] }
	};

	const res = await sparkResolver.Mutation.assignIgnites(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(assignIgnitesMock.mock.calls.length).toBe(1);
	expect(assignIgnitesMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
	expect(assignIgnitesMock.mock.calls[0][1]).toBe(TEST_SPARK_ID);
	expect(assignIgnitesMock.mock.calls[0][2].length).toBe(2);
});

test('Assign ignites with wrong Input throw EXception', async () => {
	const argsMock: MutationAssignIgnitesArgs = {
		input: { sparkId: '', ignitesIds: [] }
	};

	await expect(
		sparkResolver.Mutation.assignIgnites(null, argsMock, contextMock, null)
	).rejects.toThrow(UserInputError);
});

test('Get Top Participants for Spark', async () => {
	const res = await sparkCommonResolver.Spark.topParticipants(
		{ id: TEST_SPARK_ID },
		null,
		contextMock,
		null
	);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(topParticipantsForSparkMock.mock.calls.length).toBe(1);
	expect(topParticipantsForSparkMock.mock.calls[0][0]).toBe(TEST_SPARK_ID);
});

test('Get Top Ignites for Spark', async () => {
	const res = await sparkCommonResolver.Spark.topIgnites(
		{ id: TEST_SPARK_ID },
		null,
		contextMock,
		null
	);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(getTopIgnitesForSparkMock.mock.calls.length).toBe(1);
	expect(getTopIgnitesForSparkMock.mock.calls[0][0]).toBe(TEST_SPARK_ID);
});

test('Get Best Fit for Spark', async () => {
	const args: QueryGetBestFitSparksArgs = { sparkId: TEST_SPARK_ID };
	const res = await sparkResolver.Query.getBestFitSparks(null, args, contextMock, null);

	if (!res || !res.sparks) return;

	expect(res).not.toBeNull();
	expect(res.sparks.length).toBe(2);
	expect(getBestFitSparksMock.mock.calls.length).toBe(1);
	expect(getBestFitSparksMock.mock.calls[0][0]).toBe(TEST_SPARK_ID);
});

test('Get Best Fit for Spark: exception on bad input', async () => {
	getBestFitSparksMock.mockReset();

	const args: QueryGetBestFitSparksArgs = { sparkId: '' };

	await expect(sparkResolver.Query.getBestFitSparks(null, args, contextMock, null)).rejects.toThrow(
		UserInputError
	);

	expect(getBestFitSparksMock.mock.calls.length).toBe(0);
});

test('Get Best Fit for Profile', async () => {
	const res = await sparkResolver.Query.getBestFitForProfile(null, null, contextMock, null);

	if (!res || !res.sparks) return;

	expect(res).not.toBeNull();
	expect(res.sparks.length).toBe(2);
	expect(getBestFitForProfileMock.mock.calls.length).toBe(1);
	expect(getBestFitForProfileMock.mock.calls[0][0]).toBe(TEST_MEMBER_ID);
});
