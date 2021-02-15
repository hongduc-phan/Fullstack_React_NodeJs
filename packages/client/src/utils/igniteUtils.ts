import { flatten, map, pipe, pluck, prop, uniq } from "ramda";
import { Ignite, IgniteGroup } from "types";

export type IgniteIdsByCategory = {
  id: string;
  ignites: string[];
};

const loopUntil: ReturnType<any> = (node: IgniteGroup) => {
  if (node.children && node.children.length) {
    return node.children.flatMap(loopUntil);
  } else {
    return [node];
  }
};

const flattenIgniteGroups = (data: IgniteGroup[]) => data.flatMap(loopUntil) as IgniteGroup[];

const getAllIgnites = (igniteGroups: IgniteGroup[]): any => {
  return igniteGroups.map((item) => {
    if (item.children !== null && item.children?.length !== 0) {
      return getAllIgnites(item.children!);
    }
    return igniteGroups.map((item) => item.ignites);
  });
};

const getAllIgniteIds = (igniteGroups: IgniteGroup[]) => {
  const groupedIgnites: Ignite[] = getAllIgnites(igniteGroups).sort(
    (a: Ignite, b: Ignite) => b!.usageCount - a!.usageCount
  );
  return pipe(map(prop("id")), uniq)(flatten(groupedIgnites));
};

const getIgniteIdsByCategory = (igniteGroups: IgniteGroup[]) => {
  return flattenIgniteGroups(igniteGroups!).map((item) => ({
    id: item.id,
    ignites: [...new Set(pluck("id", item.ignites ? item.ignites : []))]
  }));
};

export { getAllIgniteIds, getIgniteIdsByCategory, flattenIgniteGroups };
