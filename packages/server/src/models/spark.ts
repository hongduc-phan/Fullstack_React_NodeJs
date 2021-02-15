export interface Spark {
    id: string;
    title: string;
    description: string;
    body: string;
    isDraft: boolean;
    backgroundImage?: string | null;
    ignites?: SparkIgnite[];
    memberId: string;
    parentSparkId?: string | null;
    sparkmapId: string;
    createdDatetime: Date;
    updatedDatetime: Date;
}

export interface SparkUpdateInput {
    id: string;
    memberId: string;
    title: string | null;
    description: string | null;
    body: string | null;
    backgroundImage: string | null;
    igniteIds: string[] | null;
}

export interface CreateSparkInput {
    title: string;
    description: string;
    body: string;
    memberId: string;
    backgroundImage?: string | null;
    ignites?: string[] | null;
}

export interface CreateSparkOnInput extends CreateSparkInput {
    parentSparkId: string;
}

export interface SparkIgnite {
    memberId: string;
    igniteId: string;
}