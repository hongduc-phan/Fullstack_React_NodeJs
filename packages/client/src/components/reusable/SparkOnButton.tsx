import { Box, Fab, IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SparkOnIcon } from "assets/icons";
import { SparkCircleComponent } from "components/Spark";
import React, { useMemo } from "react";
import randomIntFromInterval from "utils/randomIntFromInterval";

type SparkOnProps = {
  onSparkOnClick: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const SparkOnTexts = [
  "What a fascinating topic. Keep adding your perspectives!",
  "Your ideas and our SparkMaps know no limits! Add another perspective.",
  "Have you thought about another perspective? Keep adding!"
];

// TODO: improve this to render the sparkon texts randomly. Shouldn't render different one when navigating to different routes rendering the orbit on the main area
const sparkOnText = SparkOnTexts[randomIntFromInterval(0, 2)];

const SparkOnButton = ({ onSparkOnClick }: SparkOnProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <SparkCircleComponent sparkTitle={sparkOnText} circleType="sparkon" />
      <Fab color="primary" aria-label="Create SparkOn" style={{ marginTop: -30 }}>
        <IconButton onClick={onSparkOnClick}>
          <SparkOnIcon />
        </IconButton>
      </Fab>
    </Box>
  );
};

export default React.memo(SparkOnButton);
