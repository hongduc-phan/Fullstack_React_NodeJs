import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import config from '../../configs';
import { Stream, Readable } from 'stream';
import ImageStoreService from '../interfaces/imagestore';
import getLogger from '../../logger';

const logger = getLogger();

const account = config.BLOB_STORAGE_ACCOUNT_NAME || '';
const accountKey = config.BLOB_STORAGE_ACCOUNT_KEY || '';

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
	`https://${account}.blob.core.windows.net`,
	sharedKeyCredential
);

async function storeImage(stream: Readable, filename: string, memberId: string): Promise<string> {
	const containerName = `${memberId}images`
	const containerClient = blobServiceClient.getContainerClient(containerName);
	containerClient.createIfNotExists({ access: 'blob' });

	const fileHash = crypto
		.createHash('sha256')
		.update(`${memberId}${filename}${uuidv4()}`)
		.digest('hex');

	const storedFilename = `${fileHash}${filename}`;

	const blockBlobClient = containerClient.getBlockBlobClient(storedFilename);
	const res = await blockBlobClient.uploadStream(stream);

	if (res.errorCode) {
		logger.error(`Error upploading image: ${filename}, errorCode: ${res.errorCode}`);
		throw new Error(`Error on image uploading. Error code: ${res.errorCode}`);
	}

	return `${containerName}/${storedFilename}`;
}

async function getImages(memberId: string): Promise<string[] | null> {
	const containerName = `${memberId}images`
	const containerClient = blobServiceClient.getContainerClient(containerName);

	if (!containerClient.exists()) return null

	const res = []
	for await (const blob of containerClient.listBlobsFlat()) {
		res.push(`${containerName}/${blob.name}`)
	}

	return res
}

export default {
	storeImage,
	getImages
} as ImageStoreService;
