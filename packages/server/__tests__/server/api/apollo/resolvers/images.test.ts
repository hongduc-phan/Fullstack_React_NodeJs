import url from 'url';
import imagesResolver from '../../../../../src/api/apollo/resolvers/images';
import { contextMock, getImagesMock, getImagesNullMock } from '../../../../../mocks/contextmock';
import {
	testImagesList,
	IMAGES_CDN_ENDPOINT
} from '../../../../../mocks/testdata';

test('Get All images using imagesStore.getImages call', async () => {
	const res = await imagesResolver.Query.images(null, null, contextMock, null);

	expect(res).not.toBeNull();
	expect(res.length).toBe(2);
	expect(res[0].filename).toBe(testImagesList[0]);
	expect(res[0].url).toBe(`${IMAGES_CDN_ENDPOINT}/${testImagesList[0]}`);
	expect(getImagesMock.mock.calls[0][0]).toBe(contextMock.member.id);
});

test('Get All images using imagesStore.getImages call if getImages returns NULL', async () => {
	contextMock.services.imageStore.getImages = getImagesNullMock;
	const res = await imagesResolver.Query.images(null, null, contextMock, null);

	expect(res).not.toBeNull();
	expect(res.length).toBe(0);
	expect(getImagesMock.mock.calls[0][0]).toBe(contextMock.member.id);
});
