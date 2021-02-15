import { IgniteUsageCount } from 'src/models/ignite';

export default interface IgniteRepository {
    getIgniteUsageCounts: () => Promise<IgniteUsageCount[]>;
    getTopIgnitesForSpark: (sparkId: string) => Promise<IgniteUsageCount[]>;
}