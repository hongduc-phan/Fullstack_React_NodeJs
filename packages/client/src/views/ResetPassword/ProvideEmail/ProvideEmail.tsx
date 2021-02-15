import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RESET_PASSWORD } from "apollo/Mutations";
import { isEmpty } from "ramda";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "urql";
import * as vest from "vest";
import validate from "./validate";

const useStyles = makeStyles(() => ({
  content: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 64,
    paddingTop: 200,
    height: "auto",
    maxHeight: 800
  },
  formHeader: {
    marginBottom: 40,
    fontFamily: "Poppins",
    fontSize: 24
  },
  nextBtn: {
    borderRadius: 9999,
    float: "right",
    fontSize: 14
  },
  backBtn: {
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 50
  },
  textField: {
    marginTop: 30
  }
}));

const PovideEmail: React.FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({ email: "" });
  const [res, setRes] = useState(() => vest.get("provideEmail"));
  const [, resetPassword] = useMutation(RESET_PASSWORD);

  const handleResetPasswordClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const res = await resetPassword({ email: state.email });

    if (res.data.resetPassword) {
      history.push("/resetPassword/resetSent");
    }
  };

  const handleBackClick = (event: React.MouseEvent) => {
    event.preventDefault();

    history.goBack();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = { ...state, [e.target.name]: e.target.value };
    setState(nextState);
    setRes(validate(nextState, e.target.name));
  };

  return (
    <div className={classes.content}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Forgot your password?
      </Typography>

      <TextField
        className={classes.textField}
        placeholder="Email address"
        type="email"
        name="email"
        variant="filled"
        fullWidth
        error={res.hasErrors("email")}
        helperText={res.getErrors("email")}
        value={state.email}
        onChange={onChange}
      />
      <div className={classes.buttonContainer}>
        <Button color="secondary" className={classes.backBtn} size="large" onClick={handleBackClick}>
          Back
        </Button>
        <Button
          className={classes.nextBtn}
          disabled={res.hasErrors() || isEmpty(state.email)}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleResetPasswordClick}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default React.memo(PovideEmail);
