import { Spark } from './spark';

export interface SparkStatData {
    receivedSparks?: SparkStat[],
    donatedSparks?: SparkStat[]
}

export interface SparkStat {
    spark: Spark;
    count: number;
}