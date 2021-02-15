import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CodeofConduct } from "components/TermsComponents";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "76vh"
  }
}));

const CommunityCodeConductView = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleNextClick = () => {
    history.push("/registration/5", history.location.state);
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <CodeofConduct onBackClick={handleBackClick} onNextClick={handleNextClick} />
    </div>
  );
};

export default React.memo(CommunityCodeConductView);
