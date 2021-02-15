import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  content: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 64,
    paddingTop: 200,
    height: "auto",
    maxHeight: 800
  },
  formHeader: {
    marginBottom: 40,
    fontFamily: "Poppins",
    fontSize: 24
  },
  backBtn: {
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 50
  },
  contentText: {
    fontSize: 16,
    letterSpacing: 0.15,
    color: "#1B8848"
  }
}));

const ResetSent: React.FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBackClick = (event: React.MouseEvent) => {
    event.preventDefault();

    history.goBack();
  };

  return (
    <div className={classes.content}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Forgot your password?
      </Typography>

      <p className={classes.contentText}>
        Password reset sent! You'll receive an email if you are registered on our system.
      </p>

      <div className={classes.buttonContainer}>
        <Button color="secondary" className={classes.backBtn} size="large" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ResetSent);
