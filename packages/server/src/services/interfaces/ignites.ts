import { IgniteGroup } from 'src/models/ignite';

export default interface IgnitesService {
    getGroupByIgnite: (igniteId: string) => string
    getGroups: () => IgniteGroup[]
}