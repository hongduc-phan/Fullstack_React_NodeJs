import { Box, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import type { Spark } from "types";
import ExploringPath from "../ExploringPath";
import OrbitComponent from "./OrbitComponent";

type Props = {
  sparks: Spark[];
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    height: "100%",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "80px 1.7fr 0.3fr",
    gap: "0px 0px",
    gridTemplateAreas: '"insightsToggle"\n    "orbit"\n    "exploringPath"'
  },
  insightsToggle: {
    gridArea: "insightsToggle",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },
  exploringPath: {
    gridArea: "exploringPath",
    display: "flex",
    alignItems: "center",
    margin: "0 auto"
  },
  orbitContainer: {
    display: "grid",
    minWidth: 550,
    maxWidth: 650,
    margin: "auto",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(6, 1fr)",
    gridArea: "orbit",
    gap: "40px 20px",
    gridTemplateAreas:
      '". top ."\n    "topLeft top topRight"\n    "topLeft center topRight"\n    "bottomLeft center bottomRight"\n    "bottomLeft bottom bottomRight"\n    ". bottom ."'
  }
}));

const SparkMapOrbit = ({ sparks }: Props) => {
  const classes = useStyles();
  const orbitSparks = sparks.slice(0, 7);

  return (
    <Box className={classes.root}>
      <Box className={classes.insightsToggle}>
        <Box flexGrow="1" />
        <Button variant="outlined" color="primary">
          Sparkmap Insights
        </Button>
      </Box>

      <Box className={classes.orbitContainer}>
        <OrbitComponent sparks={orbitSparks} />
      </Box>

      <Box className={classes.exploringPath}>
        <ExploringPath />
      </Box>
    </Box>
  );
};

export default SparkMapOrbit;
