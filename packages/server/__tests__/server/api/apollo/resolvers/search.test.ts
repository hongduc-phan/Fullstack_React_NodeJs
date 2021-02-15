import { contextMock, searchMock } from "../../../../../mocks/contextmock";
import searchResolver from '../../../../../src/api/apollo/resolvers/search';
import { QuerySearchArgs, SearchResult } from "../../../../../src/generated/graphql";

test('Search query', async () => {
    const args: QuerySearchArgs = { query: { keywords: ['1', '2'], igniteIds: ['3', '4']} };

	const res = await searchResolver.Query.search(null, args, contextMock, null);

	if (!res || !res.mainOrbit || !res.mainOrbit.sparks || !res.otherResults) return;

	expect(res).not.toBeNull();
    expect(res.otherResults.length).toBe(2);
    expect(res.mainOrbit.sparks.length).toBe(2);
    expect(searchMock.mock.calls.length).toBe(1);
	expect(searchMock.mock.calls[0][0]).toBe(args.query);
});