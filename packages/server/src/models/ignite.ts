export interface IgniteGroup {
    id: string;
    children: IgniteGroup[];
    ignites: string[];
}

export interface SparkIgnite {
    igniteId: string;
    memberId: string;
}

export interface IgniteUsageCount {
    igniteId: string;
    usageCount: number;
}