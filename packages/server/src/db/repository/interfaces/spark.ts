import {
	Spark,
	CreateSparkInput,
	CreateSparkOnInput,
	SparkIgnite,
	SparkUpdateInput
} from '../../../models/spark';
import Maybe from 'src/types/maybe';
import { MemberFull } from 'src/models/member';

export default interface SparkRepository {
	getById: (id: string) => Promise<Spark | null>;
	getAll: (sparkmap: Maybe<string>) => Promise<Spark[] | null>;
	createSpark: (args: CreateSparkInput) => Promise<Spark>;
	createSparkOn: (args: CreateSparkOnInput) => Promise<Spark>;
	deleteSpark: (sparkId: string) => Promise<Spark | null>;
	getChildrenByParentId: (parentId: string) => Promise<Spark[] | null>;
	getParentByChildId: (childId: string) => Promise<Spark | null>;
	updateSpark: (spark: SparkUpdateInput) => Promise<Spark>;
	publishSpark: (sparkId: string) => Promise<Spark>;
	getSparkIgnites: (sparkId: string) => Promise<SparkIgnite[] | null>;
	assignIgnites: (
		memberId: string,
		sparkId: string,
		ignitesIds: string[]
	) => Promise<SparkIgnite[]>;
	getBestFitSparks: (sparkId: string) => Promise<Maybe<Spark[]>>;
	topParticipantsForSpark:  (sparkId: string) => Promise<Maybe<MemberFull[]>>;
	getBestFitForProfile: (memberId: string) => Promise<Maybe<Spark[]>>;
}
