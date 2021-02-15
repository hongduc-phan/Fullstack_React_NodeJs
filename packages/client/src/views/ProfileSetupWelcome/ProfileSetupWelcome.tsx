import { Button, Container, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(25),
    textAlign: "center"
  },
  headerText: {
    width: 600,
    margin: "0 auto"
  },
  subtitleText: {
    width: 870,
    margin: "0 auto",
    marginTop: 24
  },
  button: {
    marginTop: 48,
    padding: "8px 20px"
  }
}));

const ProfileSetupWelcome = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" className={classes.headerText}>
        Wonderful that you are joining us at Hunome!{" "}
        <span role="img" aria-label="hi icon">
          👋
        </span>
      </Typography>
      <Typography variant="body1" className={classes.subtitleText}>
        Your experience of being human matters. You can build an understanding for others to delight in and add your
        perspectives about “being human” in the SparkMaps that others have started. We at Hunome work hard to bring
        insights for you and build a community for those curious about our humanness.
      </Typography>

      <Button
        color="primary"
        variant="contained"
        component={Link}
        to={"/profile-setup/start"}
        className={classes.button}
      >
        Let's Go
      </Button>
    </Container>
  );
};

export default ProfileSetupWelcome;
