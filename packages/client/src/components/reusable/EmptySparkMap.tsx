import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingImage from "assets/magnifying_glass.png";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    textAlign: "center",
    marginTop: "8vh",
    flexDirection: "column"
  },
  textContainer: {
    maxWidth: "80%",
    margin: "0 auto",
    marginTop: 24
  },
  subtitleText: {
    marginTop: 30,
    color: "rgba(0, 0, 0, 0.6)"
  }
}));

const EmptySparkMap = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xs">
      <Box>
        <img src={LoadingImage} alt="No sparks map" width="80%" />
      </Box>
      <Box className={classes.textContainer}>
        <Typography variant="h5" component="h1">
          This is where your Sparks will appear
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitleText}>
          Create a new Spark or use the search to find and be inspired from someone else’s Sparks
        </Typography>
      </Box>
    </Container>
  );
};

export default React.memo(EmptySparkMap);
