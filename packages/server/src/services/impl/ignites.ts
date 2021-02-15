import IgnitesService from '../interfaces/ignites';
import fs from 'fs'
import path from 'path'
import ignite from 'src/api/apollo/resolvers/ignite';
import { IgniteGroup } from 'src/models/ignite';
import Dictionary from 'src/types/dictionary';

const groups = loadGroups()


const ignitesMap: Dictionary<string> = {}
getIgnitesMap(groups, ignitesMap)

function loadGroups() {
    const ignitesStr =
            fs.readFileSync(path.join(__dirname, '../../../data/ignites.json'))
                      .toString('utf-8')

    return JSON.parse(ignitesStr)
}

function getIgnitesMap(
    currentGroups: IgniteGroup[],
    map: Dictionary<string>) {
    if (!currentGroups) return

    for (const group of currentGroups) {
        if (group.ignites)
        for (const ig of group.ignites) {
            map[ig] = group.id
        }

        if (!group.children) continue

        getIgnitesMap(group.children, map)
    }
}

function getGroupByIgnite(igniteId:string): string | null {
    return ignitesMap[igniteId]
}

function getGroups(): IgniteGroup[] {
    return groups
}

export default {
    getGroupByIgnite,
    getGroups
} as IgnitesService