import { Box, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { IgniteChip, NotifySnackbar } from "components/reusable";
import { Draft } from "immer";
import { flatten, isEmpty } from "ramda";
import React, { useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { IgniteIdsByCategory } from "utils";

export type BikIgnitesOnProfileType = {
  background: string[];
  interests: string[];
  knowtypes: string[];
};

type Props = {
  className?: string;
  handleChipsSelection: (ignites: any) => void;
  bikIgnites: IgniteIdsByCategory[];
  bikIgnitesOnProfile: BikIgnitesOnProfileType;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8.5)
  },
  sectionWrapper: {
    marginTop: theme.spacing(5),
    "&:first-of-type": {
      marginTop: 0
    }
  },
  chipsContainerHeader: {
    textTransform: "capitalize",
    marginBottom: theme.spacing(2)
  },
  chipsContainer: {
    width: 500
  }
}));

const BikChipsSection = ({ className, bikIgnitesOnProfile, handleChipsSelection, bikIgnites }: Props) => {
  const classes = useStyles();

  const [erroredGroup, setErroredGroup] = useState<string | undefined>(undefined);
  const [selectedChips, setSelectedChips] = useImmer<Draft<BikIgnitesOnProfileType>>(bikIgnitesOnProfile);

  const isSelected = useMemo(() => (igniteId: string) => flatten(Object.values(selectedChips)).includes(igniteId), [
    selectedChips
  ]);

  const handleIgniteChipClick = (igniteId: string, groupId: keyof BikIgnitesOnProfileType) => {
    // Toggle
    if (isSelected(igniteId)) {
      setSelectedChips((draft) => {
        const index = draft[groupId].findIndex((item) => item === igniteId);
        draft[groupId].splice(index, 1);
      });
      setErroredGroup(undefined);
      return;
    }

    // Prevent selecting more than 5 items
    if (selectedChips[groupId].length === 5 && !isSelected(igniteId)) {
      setErroredGroup(groupId);
      return;
    }

    setSelectedChips((draft) => {
      draft[groupId].push(igniteId);
    });
  };

  useEffect(() => {
    handleChipsSelection(selectedChips);
  }, [handleChipsSelection, selectedChips]);

  return (
    <Box className={clsx(classes.root, className)}>
      {bikIgnites.map(
        ({ id: groupId, ignites }, idx) =>
          !isEmpty(ignites) && (
            <Box key={`${idx}-${groupId}`} className={classes.sectionWrapper}>
              <Typography variant="subtitle1" className={classes.chipsContainerHeader}>
                {groupId}
              </Typography>

              <Box className={classes.chipsContainer}>
                {ignites?.map((igniteId, idx) => (
                  <IgniteChip
                    clickable
                    capitalizeLabel
                    chipLabel={igniteId}
                    isSelected={isSelected(igniteId)}
                    key={`${idx}-${igniteId}`}
                    onClick={(label) => {
                      handleIgniteChipClick(label, groupId as keyof BikIgnitesOnProfileType);
                    }}
                  />
                ))}
              </Box>
            </Box>
          )
      )}

      {Boolean(erroredGroup) && (
        <NotifySnackbar
          open={Boolean(erroredGroup)}
          message="Only five ignites can be selected per category"
          onClose={() => setErroredGroup(undefined)}
        />
      )}
    </Box>
  );
};

export default React.memo(BikChipsSection);
