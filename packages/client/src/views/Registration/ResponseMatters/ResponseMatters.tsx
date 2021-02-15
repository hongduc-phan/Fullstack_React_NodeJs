import { Button, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 8,
    height: "auto",
    maxHeight: 800,
    maxWidth: 700,
    marginTop: theme.spacing(6)
  },
  formHeader: {
    marginBottom: 40,
    fontFamily: "Poppins",
    fontSize: 24
  },
  nextBtn: {
    borderRadius: 9999,
    float: "right",
    fontSize: 14
  },
  backBtn: {
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 50
  },
  textField: {
    marginTop: 30
  }
}));

const ResponseMatters: React.FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleNextClick = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push("/registration/3", history.location.state);
  };

  const handleBackClick = (event: React.MouseEvent) => {
    event.preventDefault();

    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Your response matters!
      </Typography>

      <TextField
        className={classes.textField}
        placeholder="Tell us more about your interest to understand how humanity works"
        name="interest"
        variant="filled"
        multiline
        fullWidth
        rows={4}
      />
      <TextField
        className={classes.textField}
        placeholder="How did you hear about Hunome?"
        type="howHear"
        name="howhear"
        variant="filled"
        fullWidth
      />
      <div className={classes.buttonContainer}>
        <Button color="secondary" className={classes.backBtn} size="large" onClick={handleBackClick}>
          Back
        </Button>
        <Button className={classes.nextBtn} variant="contained" color="primary" size="large" onClick={handleNextClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ResponseMatters);
