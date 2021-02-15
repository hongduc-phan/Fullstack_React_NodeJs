import { Sparkmap } from '../../../models/sparkmap';

export default interface SparkmapRepository {
	getById: (id: string) => Promise<Sparkmap | null>;
	getAll: (memberId: string) => Promise<Sparkmap[] | null>;
	getSparkmapBySparkId: (sparkId: string) => Promise<Sparkmap | null>;
}
