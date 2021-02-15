import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LoadingImage from "assets/magnifying_glass.png";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center"
  },
  imgContainer: {
    display: "flex",
    marginTop: "40%",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Loading: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Box className={classes.imgContainer}>
        <img src={LoadingImage} alt="No sparks map" width="30%" />
      </Box>
      <Typography variant="subtitle1">Loading...</Typography>
    </Container>
  );
};

export default React.memo(Loading);
