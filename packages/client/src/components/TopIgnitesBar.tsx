import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import type { Ignite } from "types";

type TopIgnitesBarProps = {
  topIgnites: Ignite[];
};

const useStyles = makeStyles(() => ({
  legendIcon: {
    width: 10,
    height: 10,
    overflow: "hidden",
    borderRadius: "50%",
    marginRight: 4
  },
  legendText: {
    textTransform: "capitalize"
  }
}));

const COLORS = ["#FFD796", "#71739E", "#C1ECF4", "#6CC6F9", "#C4C4C4"];

const TopIgnitesBar = ({ topIgnites }: TopIgnitesBarProps) => {
  const classes = useStyles();

  const topIgnitesSorted = useMemo(() => topIgnites.sort((a, b) => b.usageCount - a.usageCount), [topIgnites]);

  return (
    <>
      <Box display="flex" height="8px" borderRadius="16px" overflow="hidden">
        {topIgnitesSorted.map(({ id, usageCount }, i) => {
          const percentage = (usageCount / topIgnitesSorted.length) * 100 + "%";
          return <div key={`bar_${id}_${usageCount}`} style={{ width: percentage, backgroundColor: COLORS[i] }} />;
        })}
      </Box>

      <Box display="flex" marginTop={1.5}>
        {topIgnitesSorted.map(({ id, usageCount }, i) => {
          return (
            <Box key={`leg_${id}_${usageCount}`} display="flex" alignItems="center" marginRight={2}>
              <div className={classes.legendIcon} style={{ backgroundColor: COLORS[i] }} />
              <Typography variant="caption" className={classes.legendText}>
                {id}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default TopIgnitesBar;
