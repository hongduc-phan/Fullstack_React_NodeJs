import { ApolloError } from 'apollo-server-express';
import {
	Ignite,
	MemberPublicProfile,
	ProfileActivity,
	QuerySearchArgs,
	SearchResult,
	Spark,
	SparkIgnite
} from 'src/generated/graphql';
import ApolloContext from 'src/types/apollocontext';
import Maybe from 'src/types/maybe';

async function search(
	parent: any,
	args: QuerySearchArgs,
	{ req, db, member }: ApolloContext,
	info: any
) {
	return db.search.search(args.query);
}

export default {
	Query: {
		search
	}
};
