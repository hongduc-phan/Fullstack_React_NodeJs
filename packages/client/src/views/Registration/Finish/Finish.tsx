import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  content: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 64,
    paddingTop: 50,
    height: "auto",
    maxHeight: 800
  },
  formHeader: {
    marginBottom: 40,
    fontFamily: "Poppins",
    fontSize: 24
  },
}));

const Finish: React.FunctionComponent<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
      Thank you for your interest in Hunome, you will hear from us soon!
      </Typography>

      <p>
        Curiosity about our humanness is more fun with others. Let your contacts know where to find you.
      </p>
      
    </div>
  );
};

export default React.memo(Finish);
