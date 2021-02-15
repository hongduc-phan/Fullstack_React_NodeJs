import { Box } from "@material-ui/core";
import { IgniteChip } from "components/reusable";
import { find, propEq } from "ramda";
import React, { useCallback, useMemo } from "react";
import { IgniteCategories, IgniteSubCategories } from "types";
import { IgniteIdsByCategory } from "utils";

type Props = {
  className?: string;
  categoryId?: string;
  igniteIds: string[];
  selectedIgniteIds: string[];
  igniteIdsByCategory: IgniteIdsByCategory[];
  handleIgniteChipClick: (clickedChip: string) => void;
};

const IgniteChipsContainer = ({
  className,
  igniteIdsByCategory,
  categoryId,
  selectedIgniteIds,
  igniteIds,
  handleIgniteChipClick
}: Props) => {
  const isSelected = useCallback((chipValue: string) => selectedIgniteIds.includes(chipValue), [selectedIgniteIds]);

  const isIgniteChipClickAllowed = useMemo(() => {
    if (!categoryId) return true;

    const selectedIgnitesCountFromCategory =
      find(propEq("id", categoryId), igniteIdsByCategory)?.ignites.filter((item) => selectedIgniteIds.includes(item))
        .length ?? 0;

    const maxAllowedCount = find(propEq("id", categoryId), allowedIgnitesPerCategory)?.maxCount ?? 2;

    return selectedIgnitesCountFromCategory < maxAllowedCount;
  }, [categoryId, igniteIdsByCategory, selectedIgniteIds]);

  return (
    <Box className={className}>
      {igniteIds.map((igniteChip, idx) => {
        const selected = isSelected(igniteChip);
        const clickAllowed = isIgniteChipClickAllowed || selected;

        return (
          <IgniteChip
            key={`idx-${igniteChip}`}
            capitalizeLabel
            clickable
            chipLabel={igniteChip}
            isSelected={selected}
            onClick={() => {
              if (clickAllowed) {
                handleIgniteChipClick(igniteChip);
              }
            }}
          />
        );
      })}
    </Box>
  );
};

const allowedIgnitesPerCategory: { id: IgniteCategories | IgniteSubCategories; maxCount: number }[] = [
  { id: "gutfeel", maxCount: 1 },
  {
    id: "knowtypes",
    maxCount: 3
    // minimum is 1 when creating spark
  },
  { id: "human context", maxCount: 3 },
  { id: "human systems", maxCount: 2 },
  { id: "time", maxCount: 1 },
  { id: "future", maxCount: 3 },
  { id: "enduring", maxCount: 2 },
  { id: "change", maxCount: 1 },
  { id: "relevance to humanity", maxCount: 1 },
  { id: "relevance to me", maxCount: 2 },
  { id: "relevance to some", maxCount: 2 },
  { id: "agreement", maxCount: 1 },
  { id: "writing style", maxCount: 1 }
];

export default IgniteChipsContainer;
