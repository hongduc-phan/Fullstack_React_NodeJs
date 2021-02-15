import { Box, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: "50%",
    height: "100%",
    width: "100%"
  },

  text: {
    color: theme.palette.common.white
  }
}));

type Props = {
  children: string;
};

const AvatarPlaceholder = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="body1" className={classes.text}>
        {children}
      </Typography>
    </Box>
  );
};

export default AvatarPlaceholder;
