import { Box, Button, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "70%"
  },
  contentContainer: {
    textAlign: "center",
    width: 300,
    margin: "0 auto"
  },
  buttonContainer: {
    marginTop: theme.spacing(4.5)
  },
  button: {
    marginTop: 16
  }
}));

type Props = {
  className?: string;
};

const Welcome = ({ className }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.contentContainer}>
        <Typography variant="h5" component="h1">
          Hop on board!
        </Typography>

        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            className={classes.button}
            onClick={() => history.push("/registration/1")}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            className={classes.button}
            onClick={() => history.push("/auth/login")}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Welcome);
