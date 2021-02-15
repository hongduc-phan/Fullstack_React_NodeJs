import sparkmapResolver from '../../../../../src/api/apollo/resolvers/sparkmap';
import {
	contextMock,
	getSparkmapAllMock,
	getSparkmapByIdMock,
	createEmptySparkmapMock
} from '../../../../../mocks/contextmock';
import { TEST_SPARKMAP_ID } from '../../../../../mocks/testdata';

test('Get All sparkmaps using db.getAll call', async () => {
	const res = await sparkmapResolver.Query.sparkmaps(null, null, contextMock, null);

	if (!res) return;

	expect(res).not.toBeNull();
	expect(res.length).toBe(1);
	expect(res[0].id).toBe(TEST_SPARKMAP_ID);
	expect(getSparkmapAllMock.mock.calls.length).toBe(1);
	expect(getSparkmapAllMock.mock.calls[0][0]).toBe(contextMock.member.id);
});

test('Get Single sparkmap using db.getById call', async () => {
	const argsMock = { id: TEST_SPARKMAP_ID };
	const res = await sparkmapResolver.Query.sparkmap(null, argsMock, contextMock, null);

	if (!res) return;

	expect(res.id).toBe(argsMock.id);
	expect(getSparkmapByIdMock.mock.calls.length).toBe(1);
	expect(getSparkmapByIdMock.mock.calls[0][0]).toBe(argsMock.id);
});