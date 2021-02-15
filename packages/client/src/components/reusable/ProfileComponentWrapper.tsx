import { Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactChild } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  drawerContent: {
    position: "absolute",
    right: "1%",
    top: "25%",
    height: "100%",
    padding: theme.spacing(3),
    width: 614
  }
}));

type ProfileComponentWrapperProps = {
  children: ReactChild;
  maxWidth?: "xs" | "sm" | "md" | "lg";
};

const ProfileComponentWrapper = ({ children, maxWidth }: ProfileComponentWrapperProps) => {
  const classes = useStyles();
  return (
    <Container className={classes.drawerContent} maxWidth={maxWidth ? maxWidth : "sm"}>
      {children}
    </Container>
  );
};

export default React.memo(ProfileComponentWrapper);
