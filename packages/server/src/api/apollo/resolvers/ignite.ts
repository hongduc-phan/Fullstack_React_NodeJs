import ApolloContext from 'src/types/apollocontext';
import { IgniteGroup } from 'src/generated/graphql';
import { IgniteUsageCount } from 'src/models/ignite';
import { IgniteGroup as IgniteGroupModel } from 'src/models/ignite';
import { count } from 'console';

function fillUsage(
	igniteGroups: IgniteGroupModel[],
	ingnitesCount: IgniteUsageCount[],
	combinedGroup: IgniteGroup[]
) {
	if (!igniteGroups) return;

	for (const group of igniteGroups) {

		const newGroup:IgniteGroup  = { id: group.id, ignites: [], children: [] }
		combinedGroup.push(newGroup)

		if (group.ignites)
			for (const i of group.ignites) {
				const igniteUsage = ingnitesCount.find((x) => x.igniteId === i);
				if (!newGroup.ignites) continue
				newGroup.ignites.push({
					id: i,
					usageCount: igniteUsage?.usageCount || 0
				});
			}

		if (!group.children) continue;

		fillUsage(group.children, ingnitesCount, newGroup.children as IgniteGroup[]);
	}
}

export default {
	Query: {
		ignites: async (
			parent: any,
			args: any,
			{ db, services }: ApolloContext,
			info: any
		): Promise<IgniteGroup[]> => {
			const ingnitesCount = await db.ignite.getIgniteUsageCounts();

			const igniteGroups = await services.ignites.getGroups();

			const combinedGroup: IgniteGroup[] = [];

			fillUsage(igniteGroups, ingnitesCount, combinedGroup);

			return combinedGroup;
		}
	}
};
