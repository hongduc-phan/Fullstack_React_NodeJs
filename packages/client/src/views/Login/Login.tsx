// TODO: Add form validation
import { Box, Button, Grid, Link, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LOGIN_MEMBER } from "apollo/Mutations";
import { useAuthStore } from "contexts/AuthContext";
import { isEmpty } from "ramda";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "urql";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 100,
    padding: 0,
    height: "auto",
    width: 556
  },
  formHeader: {
    marginBottom: theme.spacing(3)
  },
  errorText: {
    marginTop: 16
  },
  forgotPasswordAction: {
    paddingRight: theme.spacing(1.5)
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login } = useAuthStore();

  const [state, setState] = useState({
    email: "",
    password: "",
    error: ""
  });

  const { email, password, error } = state;
  const isLoginDisabled = isEmpty(email) || isEmpty(password);

  const [, loginUser] = useMutation(LOGIN_MEMBER);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleForgotClick = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/resetPassword/provideEmail");
  };

  const handleLoginClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const variables = { email: state.email, password: state.password };

    loginUser(variables)
      .then(
        ({
          data: {
            login: { token }
          }
        }) => {
          login(token);
        }
      )
      .catch((error) => {
        setState({ ...state, error: error.message });
      });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Log in to Hunome
      </Typography>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <TextField
            label="Email or username"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      {error && (
        <Typography variant="subtitle1" color="error" className={classes.errorText}>
          {error}
        </Typography>
      )}

      <Box display="flex" justifyContent="space-between" mt={5.5}>
        <Link component="button" variant="caption" onClick={handleForgotClick} className={classes.forgotPasswordAction}>
          Forgot password?
        </Link>

        <Button variant="contained" color="primary" size="medium" onClick={handleLoginClick} disabled={isLoginDisabled}>
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
