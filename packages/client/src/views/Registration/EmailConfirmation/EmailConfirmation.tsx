import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { REGISTER_MEMBER, SEND_VERIFICATION_CODE, VERIFY_CODE } from "apollo/Mutations";
import { useAuthStore } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "urql";

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
  verifyBtn: {
    borderRadius: 9999,
    float: "right",
    fontSize: 14
  },
  resendBtn: {
    color: "#385B97",
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 50
  },
  textField: {
    marginTop: 30
  }
}));

type RegistrationInfo = {
  email: string;
  membername: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: string;
};

const EmailConfirmation: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const [, registerMember] = useMutation(REGISTER_MEMBER);
  const [, sendVerificationCode] = useMutation(SEND_VERIFICATION_CODE);
  const [, verifyCode] = useMutation(VERIFY_CODE);
  const { login } = useAuthStore();

  const regInfo = history.location.state as RegistrationInfo;

  const [state, setState] = useState({
    code: "",
    email: regInfo.email,
    enableVerify: false,
    err: !regInfo ? "Error" : ""
  });

  const { code, email, enableVerify } = state;

  useEffect(() => {
    sendVerificationCode({ email });
  }, [email, sendVerificationCode]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = { ...state, [e.target.name]: e.target.value };
    nextState.enableVerify = !!nextState.code;

    setState(nextState);
  };

  const handleVerifyClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const res = await verifyCode({ code, email: regInfo.email });

    if (res.data.verifyCode) {
      const res = await registerMember({
        email: regInfo.email,
        membername: regInfo.membername,
        password: regInfo.password,
        firstname: regInfo.firstname,
        lastname: regInfo.lastname,
        birthdate: regInfo.birthdate
      });

      if (res.error) {
        setState({ ...state, err: res.error.message });
        return;
      }

      login(res.data.register.token);
      history.push("/sparkmap");
    }
  };

  const handleResendClick = (event: React.MouseEvent) => {
    event.preventDefault();

    sendVerificationCode({ email });
  };

  return (
    <div className={classes.content}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Let’s verify your email
      </Typography>
      <span>We just emailed a six-digit code to {email}. Enter the code below to confirm your email address.</span>

      <TextField
        className={classes.textField}
        placeholder="Verification code"
        type="text"
        name="code"
        onChange={onChange}
        variant="filled"
        value={code}
        fullWidth
      />
      <div className={classes.buttonContainer}>
        <Button className={classes.resendBtn} size="large" onClick={handleResendClick}>
          RESEND CODE
        </Button>
        <Button
          className={classes.verifyBtn}
          disabled={!enableVerify}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleVerifyClick}
        >
          VERIFY & REGISTER
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EmailConfirmation);
