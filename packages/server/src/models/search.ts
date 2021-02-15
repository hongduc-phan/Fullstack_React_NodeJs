import Maybe from 'src/types/maybe';
import { MemberFull } from './member';
import { Spark } from './spark';

export type SearchQuery = {
	keywords: string[];
	igniteIds: string[];
};

export type SearchResult = {
	mainOrbit: Orbit;
	otherResults: SparkMapSummary[];
};

export type Orbit = {
	sparks: Spark[];
};

export type SparkMapSummary = {
	sparkmapId: string;
	sparksCount: number;
	ignitesCount: number;
	participantsCount: number;
	topParticipants: MemberFull[];
	topIgnites: string[];
	initialSparkTitle: string;
	initialSparkImgUrl: string;
	initiatedBy: MemberFull;
	initiatedDate: Date;
};