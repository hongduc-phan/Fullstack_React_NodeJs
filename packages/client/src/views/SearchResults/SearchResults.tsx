import { Box, Grid, Typography } from "@material-ui/core";
import { OtherResultCard, TopResultCard } from "components/SearchResultCard";
import React from "react";

// Each card would require following data:

// sparksCount
// ignitesCount
// participantsCount

// fistSpark author details => date, full name, avatar
// most active users' avatars

// top ignites => total ignites + ids + each ignite count

const SearchResults = () => {
  return (
    <Box>
      <Box padding="0 16px">
        <Box>
          <Typography variant="overline" component="p" style={{ marginTop: "20px", marginBottom: "16px" }}>
            Insights on top result
          </Typography>
          <TopResultCard />
        </Box>
        <Typography variant="overline" component="p" style={{ marginTop: "20px", marginBottom: "16px" }}>
          More to explore
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <OtherResultCard />
          </Grid>

          <Grid item>
            <OtherResultCard />
          </Grid>

          <Grid item>
            <OtherResultCard />
          </Grid>

          <Grid item>
            <OtherResultCard />
          </Grid>

          <Grid item>
            <OtherResultCard />
          </Grid>

          <Grid item>
            <OtherResultCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchResults;
