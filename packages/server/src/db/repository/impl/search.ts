import SearchRepository from '../interfaces/search';
import { Orbit, SearchQuery, SearchResult, SparkMapSummary } from 'src/models/search';
import { executeQuery } from '../../neo4j/executequery';
import { SEARCH_GET_CARDS_QUERY, SEARCH_GET_ORBIT_QUERY } from './queries/search';
import { ApolloError } from 'apollo-server-express';
import { Spark } from 'src/models/spark';
import Maybe from 'src/types/maybe';

async function search(query: SearchQuery): Promise<Maybe<SearchResult>> {
	const result = await Promise.all([
		executeQuery(SEARCH_GET_ORBIT_QUERY, {
			igniteIds: query.igniteIds,
			keywords: query.keywords
		}),
		executeQuery(SEARCH_GET_CARDS_QUERY, {
			igniteIds: query.igniteIds,
			keywords: query.keywords
		})
	]);

	if (!result) throw new ApolloError('search query error.');

	const recOrbit = result[0].records[0];
	const sparks: Spark[] = [recOrbit.get('center') as Spark].concat(
		recOrbit.get('sparkOns') as Spark[]
	);

	const recsOther = result[1].records;
	const otherResults: SparkMapSummary[] = recsOther.map((r) => ({
		sparkmapId: r.get('sparkmapId'),
		sparksCount: r.get('sparksCount').low,
		ignitesCount: r.get('ignitesCount').low,
		participantsCount: r.get('participantsCount').low,
		topParticipants: r.get('topParticipants'),
		topIgnites: r.get('topIgnites'),
		initialSparkTitle: r.get('initialSparkTitle'),
		initialSparkImgUrl: r.get('initialSparkImgUrl'),
		initiatedBy: r.get('initiatedBy'),
		initiatedDate: Date.parse(r.get('initiatedDate'))
			? new Date(r.get('initiatedDate'))
			: new Date(0)
	}));

	const ret: SearchResult = {
		mainOrbit: { sparks },
		otherResults
	};

	return ret;
}

export default {
	search
} as SearchRepository;
