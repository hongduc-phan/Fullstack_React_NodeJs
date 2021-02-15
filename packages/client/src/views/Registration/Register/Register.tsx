import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Theme,
  Tooltip,
  Typography
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { HelpOutline as HelpOutlineIcon, Visibility, VisibilityOff } from "@material-ui/icons";
import { CHECK_MEMBERNAME } from "apollo/Mutations";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "urql";
import vest from "vest";
import validate from "./validate";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 8,
    height: "auto",
    maxHeight: 800,
    maxWidth: 700,
    marginTop: theme.spacing(6)
  },
  formHeader: {
    marginBottom: 40
  },
  errorText: {
    marginTop: 16
  },
  button: {
    borderRadius: 9999,
    float: "right"
  },
  copyrightText: {
    display: "block",
    marginTop: 40
  },
  tooltip: {
    padding: 15
  },
  tooltipPlace: {
    marginTop: 18
  },
  pwdLabel: {
    zIndex: 1,
    transform: "translate(12px, 20px) scale(1)",
    fontSize: 16
  },
  helpIcon: {
    color: "gray"
  },
  passwordError: {
    color: "red"
  }
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [, checkMembername] = useMutation(CHECK_MEMBERNAME);

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    membername: "",
    password: "",
    err: "",
    showPassword: false,
    birthdate: "",
    membernameExists: false,
    emailExists: false
  });

  const [result, setResult] = useState(() => vest.get("registration"));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = { ...state, [e.target.name]: e.target.value };
    setState(nextState);
    setResult(validate(nextState, e.target.name));
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleNextClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const res = await checkMembername({ membername: state.membername, email: state.email });

    if (res.error) {
      setState({ ...state, err: res.error.message });
      return;
    }

    const membernameExists = res.data.checkMembername.membernameExists;
    const emailExists = res.data.checkMembername.emailExists;

    setState({
      ...state,
      membernameExists,
      emailExists
    });

    if (!membernameExists && !emailExists) history.push("/registration/2", state);
  };

  const getMembernameError = () => {
    if (result.hasErrors("membername")) return result.getErrors("membername");
    if (state.membernameExists) return ["Membername already exists"];

    return null;
  };

  const getEmailError = () => {
    if (result.hasErrors("email")) return result.getErrors("email");
    if (state.emailExists) return ["Email already exists"];

    return null;
  };

  const { firstname, lastname, email, password, membername, err, showPassword, birthdate } = state;

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.formHeader}>
        Register for an invitation
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              label="Firstname"
              type="name"
              name="firstname"
              value={firstname}
              onChange={onChange}
              variant="filled"
              fullWidth
              error={result.hasErrors("firstname")}
              helperText={result.getErrors("firstname")}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Lastname"
              type="name"
              name="lastname"
              value={lastname}
              onChange={onChange}
              variant="filled"
              fullWidth
              error={result.hasErrors("lastname")}
              helperText={result.getErrors("lastname")}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Username"
              type="name"
              name="membername"
              value={membername}
              onChange={onChange}
              variant="filled"
              fullWidth
              error={state.membernameExists || result.hasErrors("membername")}
              helperText={getMembernameError()}
            />
          </Grid>
          <Grid item xs={2}>
            <HtmlTooltip
              title={
                <div className={classes.tooltip}>
                  Chose carefully this is your unique ID. Minimum 2 and maximum 12 characters. At least 2 letters (a-z)
                  in addition you can use numbers (0-9).
                </div>
              }
              className={classes.tooltipPlace}
              placement="top"
            >
              <HelpOutlineIcon className={classes.helpIcon} />
            </HtmlTooltip>
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="filled"
              value={email}
              onChange={onChange}
              fullWidth
              error={state.emailExists || result.hasErrors("email")}
              helperText={getEmailError()}
            />
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth variant="filled">
              <InputLabel className={classes.pwdLabel} htmlFor="reg-password">
                Password
              </InputLabel>
              <FilledInput
                id="reg-password"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={onChange}
                error={result.hasErrors("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="standard-weight-helper-text"
                className={result.hasErrors("password") ? classes.passwordError : ""}
              >
                Use 8 or more characters with a mix of letters, numbers & symbols
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            {err && (
              <Typography variant="subtitle1" className={classes.errorText}>
                {err}
              </Typography>
            )}
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Birthday"
              type="date"
              name="birthdate"
              variant="filled"
              value={birthdate}
              onChange={onChange}
              fullWidth
              error={result.hasErrors("birthdate")}
              helperText={result.getErrors("birthdate")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <HtmlTooltip
              title={
                <div className={classes.tooltip}>
                  You are welcome to Hunome at 16 years of age and over. If you between 13 and 16 years of age
                  continuing with the registration indicates to us at Hunome that you have parental approval to join.
                </div>
              }
              className={classes.tooltipPlace}
              placement="top"
            >
              <HelpOutlineIcon className={classes.helpIcon} />
            </HtmlTooltip>
          </Grid>
          <Grid item xs={10}>
            <Button
              disabled={result.hasErrors()}
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNextClick}
              className={classes.button}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default React.memo(Register);
