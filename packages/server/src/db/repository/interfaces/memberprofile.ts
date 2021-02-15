import { SparkStat } from 'src/models/sparkstat';


export default interface MemberProfileRepository {
    getReceivedSparksCount: (memberId: string) => Promise<SparkStat[]>;
    getDonatedSparksCount: (memberId: string) => Promise<SparkStat[]>;
    getReceivedIgnitesSparksCount: (memberId: string) => Promise<SparkStat[]>;
    getDonatedIgnitesSparksCount: (memberId: string) => Promise<SparkStat[]>;
}