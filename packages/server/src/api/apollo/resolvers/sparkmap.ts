import ApolloContext from 'src/types/apollocontext'

/*
 * Queries:
 * spark, sparks
 *
 * Methods:
 * createSpark,
 *
 */
export default {
    Query:{
       sparkmap: async (parent: any, args: { id: any }, { req, db }: ApolloContext, info: any) => {
            return await db.sparkmap.getById(args.id)
        },
        sparkmaps: async (
            parent: any,
            args: any,
            { req, db, member }: ApolloContext,
            info: any) => {
            return await db.sparkmap.getAll(member.id)
        },
    }
}