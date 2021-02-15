import ApolloContext from 'src/types/apollocontext';
import config from '../../../configs';

export default {
	Query: {
		images: async (parent: any, args: any, { req, services, member }: ApolloContext, info: any) => {
			const imagesList = await services.imageStore.getImages(member.id);

			return (imagesList || []).map((f: any) => ({
				filename: f,
				url: `${config.IMAGES_CDN_ENDPOINT}/${f}`
			}));
		}
	},
	Mutation: {
		singleUpload: async (
			root: any,
			{ file }: any,
			{ req, services, member }: ApolloContext,
			info: any
		) => {
			const { createReadStream, filename, mimetype, encoding } = await file;

			const storedFilename = await services.imageStore.storeImage(
				createReadStream(),
				filename,
				member.id
			);

			return {
				filename: storedFilename,
				url: `${config.IMAGES_CDN_ENDPOINT}/${storedFilename}`
			};
		}
	}
};
