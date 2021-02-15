import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    height: "100%"
  },
  content: {
    margin: "auto"
  }
}));

const CenteredComponent = ({ children, className }: Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <Typography component="div" className={classes.content}>
        {children}
      </Typography>
    </div>
  );
};

export default CenteredComponent;
