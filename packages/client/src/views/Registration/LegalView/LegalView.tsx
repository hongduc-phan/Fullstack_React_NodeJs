import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Legal } from "components/TermsComponents";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "76vh"
  }
}));

const LegalView = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleNextClick = () => {
    history.push("/registration/4", history.location.state);
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Legal onBackClick={handleBackClick} onNextClick={handleNextClick} />
    </div>
  );
};

export default React.memo(LegalView);
