import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center"
  }
}));

const CenteredTextComponent = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Typography variant="body1" component="h6" className={classes.root}>
      {children}
    </Typography>
  );
};

export default CenteredTextComponent;
