import { Stream } from 'stream';

export default interface ImageStoreService {
    storeImage: (stream: Stream, filename: string, memberId: string) => Promise<string>
    getImages: (memberId: string) => Promise<string[] | null>
}