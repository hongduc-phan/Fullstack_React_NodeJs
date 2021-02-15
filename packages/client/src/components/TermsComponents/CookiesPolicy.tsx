import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const TEXT_CONTENT_HEIGHT = "40vh";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "76vh"
  },
  formHeader: {
    height: theme.spacing(4),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
  textContent: {
    height: TEXT_CONTENT_HEIGHT,
    overflowY: "auto",
    padding: theme.spacing(0, 3),
    fontSize: 14,
    letterSpacing: 0.25
  }
}));

type Props = {
  disableActions?: boolean;
  onBackClick?: () => void;
  onNextClick?: () => void;
};

const CookiesPolicy = ({ disableActions = false, onBackClick = () => {}, onNextClick = () => {} }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.formHeader}>
        Cookies Policy
      </Typography>

      <div className={classes.textContent}>
        <pre>TBA</pre>
      </div>
    </div>
  );
};

export default React.memo(CookiesPolicy);
