import { Box, Button, Typography } from "@material-ui/core";
import { GET_IGNITES } from "apollo/Queries";
import { Loader } from "components";
import React from "react";
import { IgniteGroup } from "types";
import { useQuery } from "urql";
import { getAllIgniteIds, getIgniteIdsByCategory } from "utils";
import { IgniteChipsContainer, IgniteListSection } from "views/IgniteSelection/components";

type IgniteSelectionProps = {
  handleIgniteChipClick: (igniteId: string) => void;
  selectedIgniteIds: string[];
};

const IgniteSelectionSection = ({ selectedIgniteIds, handleIgniteChipClick }: IgniteSelectionProps) => {
  const [{ fetching, error, data }, refetch] = useQuery<{ ignites: IgniteGroup[] }>({ query: GET_IGNITES });

  if (fetching) {
    return (
      <Box margin="40px auto">
        <Loader variant="inline" />
      </Box>
    );
  }

  if (!data || error) {
    return (
      <Box margin="40px auto" textAlign="center">
        <Typography gutterBottom variant="body2">
          Couldn't fetch ignites.
        </Typography>
        <Button color="primary" variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  const allIgniteIds = getAllIgniteIds(data.ignites);
  const igniteIdsByCategory = getIgniteIdsByCategory(data.ignites);

  const mostFrequentIgniteIds = allIgniteIds.slice(0, 10);

  return (
    <Box>
      <Box marginBottom="10px">
        <IgniteChipsContainer
          igniteIds={mostFrequentIgniteIds}
          selectedIgniteIds={selectedIgniteIds}
          handleIgniteChipClick={handleIgniteChipClick}
          igniteIdsByCategory={igniteIdsByCategory}
        />
      </Box>

      <Box height={`calc(100vh - 500px)`} overflow="hidden auto">
        <IgniteListSection
          hideSecondaryText
          igniteIdsByCategory={igniteIdsByCategory}
          selectedIgniteIds={selectedIgniteIds}
          handleIgniteChipClick={handleIgniteChipClick}
        />
      </Box>
    </Box>
  );
};

export default IgniteSelectionSection;
