import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CHECK_RESET_ID, SET_NEW_PASSWORD } from "apollo/Mutations";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RouteParams } from "types";
import { useMutation } from "urql";
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

const SetNewPassword: React.FunctionComponent<{}> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { resetId }: RouteParams = useParams();
  const [state, setState] = useState({ password: "", confirmPassword: "" });
  const [res, setRes] = useState(validate);
  const [, checkResetId] = useMutation(CHECK_RESET_ID);
  const [, setNewPassword] = useMutation(SET_NEW_PASSWORD);

  useEffect(() => {
    checkResetId({ resetId }).then((res) => {
      if (!res.data.checkResetID) {
        history.push("/auth/login");
      }
    });
  }, [resetId, checkResetId, history]);

  const handleSetNewPasswordClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const res = await setNewPassword({ resetId, password: state.password });
    if (res.data.setNewPassword) {
      history.push("/auth/login");
    }
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push("/auth/login");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = { ...state, [e.target.name]: e.target.value };
    setState(nextState);
    setRes(validate(nextState, e.target.name));
  };

  return (
    <div className={classes.content}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Now you may enter your new password
      </Typography>

      <TextField
        className={classes.textField}
        placeholder="Password"
        type="password"
        name="password"
        variant="filled"
        fullWidth
        error={res.hasErrors("password")}
        helperText={res.getErrors("password")}
        value={state.password}
        onChange={onChange}
      />
      <TextField
        className={classes.textField}
        placeholder="Confirm password"
        type="password"
        name="confirmPassword"
        variant="filled"
        fullWidth
        error={res.hasErrors("confirmPassword")}
        helperText={res.getErrors("confirmPassword")}
        value={state.confirmPassword}
        onChange={onChange}
      />
      <div className={classes.buttonContainer}>
        <Button color="secondary" className={classes.backBtn} size="large" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button
          className={classes.nextBtn}
          disabled={res.hasErrors()}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSetNewPasswordClick}
        >
          Set New Password
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SetNewPassword);
