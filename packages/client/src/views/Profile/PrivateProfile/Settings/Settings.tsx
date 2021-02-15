import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon, MoreVert as MoreIcon } from "@material-ui/icons";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import { Alert as MuiAlert, AlertProps } from "@material-ui/lab";
import { CHANGE_EMAIL, CHANGE_PASSWORD } from "apollo/Mutations";
import { GET_PRIVATE_PROFILE } from "apollo/Queries";
import { Loader } from "components";
import { useAuthStore } from "contexts/AuthContext";
import { useForm } from "hooks";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "types";
import { useMutation, useQuery } from "urql";
import TermsConditionsModal from "./TermsConditionsModal";
import validator from "./validate";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    padding: 0
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
    top: HEADER_HEIGHT
  },
  dialogTitle: {
    flex: 1,
    marginLeft: theme.spacing(2)
  },
  drawerContent: {
    height: "100%",
    padding: theme.spacing(3)
  },
  appBar: {
    top: 0,
    bottom: "auto"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loginInfoContainer: {},
  usernameText: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(4.5)
  },
  inputField: {
    marginTop: 36,
    "&:first-of-type": {
      marginTop: 30
    }
  },
  passwordField: {
    marginTop: theme.spacing(2)
  },
  forgotPasswordText: {
    display: "block",
    color: "#488CCF",
    marginTop: theme.spacing(0.6),
    paddingLeft: theme.spacing(2),
    "&:hover": {
      cursor: "pointer"
    }
  },
  termsContainer: {
    marginTop: theme.spacing(6)
  },
  termsLink: {
    color: "#488CCF",
    paddingLeft: 0
  },

  termsLinkIcon: {
    minWidth: theme.spacing(4.5)
  },
  copyrightTextContainer: {
    textAlign: "center",
    marginTop: theme.spacing(8),
    color: "rgba(0, 0, 0, 0.38)"
  }
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export type TermsItem = "PrivacyPolicy" | "Terms" | "CodeOfConduct";

type SettingsProps = {
  membername: string | undefined;
};

type ProfileSettingsFormState = {
  email: string;
  currentPassword: string;
  newPassword: string;
};

const Settings = ({ membername }: SettingsProps) => {
  const classes = useStyles();
  const { logout } = useAuthStore();
  const history = useHistory();
  const [modalOpenType, setModalOpenType] = useState<TermsItem | undefined>(undefined);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"info" | "success" | "warning" | "error">("info");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const initialFormState = {
    email: "",
    currentPassword: "",
    newPassword: ""
  };

  const { formState, validationResult, onChange, resetForm } = useForm<ProfileSettingsFormState>({
    initialFormState,
    validateFn: validator,
    suiteName: "profileSettings"
  });

  const { values: formValues, dirty } = formState;
  const { getErrors, hasErrors } = validationResult;

  const [, changePassword] = useMutation(CHANGE_PASSWORD);
  const [, changeEmail] = useMutation(CHANGE_EMAIL);

  const handleTermsItemClick = (value: TermsItem) => setModalOpenType(value);
  const handleTermsModalClose = () => setModalOpenType(undefined);
  const handleSnackbarClose = () => setShowSnackbar(false);

  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleMenuClose();
    logout();
  };

  const handlePasswordChangeClick = (e: React.MouseEvent) => {
    e.preventDefault();

    changePassword({ currentPassword: formValues.currentPassword, newPassword: formValues.newPassword })
      .then((res: any) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Password changed successfully!");
        setShowSnackbar(true);
      })
      .catch((err) => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Couldn't change password");
        setShowSnackbar(true);
      })
      .finally(() => {
        resetForm();
      });
  };

  const handleEmailChangeClick = (e: React.MouseEvent) => {
    e.preventDefault();

    changeEmail({ newEmail: formValues.email })
      .then((res: any) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Email changed successfully!");
        setShowSnackbar(true);
      })
      .catch((err) => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Couldn't update email");
        setShowSnackbar(true);
      })
      .finally(() => {
        resetForm();
      });
  };

  const handleBackIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    history.goBack();
  };

  const isChangeEmailBtnDisabled = !Boolean(dirty.email) || hasErrors("email");

  const isChangePasswordBtnDisabled =
    !Boolean(dirty.currentPassword) ||
    !Boolean(dirty.newPassword) ||
    hasErrors("currentPassword") ||
    hasErrors("newPassword");

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <AppBar color="inherit" position="sticky" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" aria-label="Close form" onClick={handleBackIconClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.dialogTitle}>
            Settings
          </Typography>
          <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleMenuIconClick}>
            <MoreIcon />
          </IconButton>
          <Menu id="profile-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <RouterLink to={`/profile/editprofile`} style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
            </RouterLink>
            <RouterLink to={`/profile/settings`} style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            </RouterLink>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container className={classes.drawerContent}>
        <Box className={classes.loginInfoContainer}>
          <Typography variant="subtitle1">Login</Typography>
          <Typography variant="body2" color="textSecondary" className={classes.usernameText}>
            @{membername}
          </Typography>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formValues.email ?? ""}
            onChange={onChange}
            error={hasErrors("email")}
            helperText={getErrors("email")}
            variant="filled"
            className={classes.passwordField}
          />
          <Box display="flex">
            <Box flexGrow={1} />
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              disabled={isChangeEmailBtnDisabled}
              onClick={handleEmailChangeClick}
            >
              Save
            </Button>
          </Box>
          <Typography variant="subtitle1">Change password</Typography>
          <TextField
            fullWidth
            name="currentPassword"
            label="Current password"
            value={formValues.currentPassword ?? ""}
            onChange={onChange}
            error={hasErrors("currentPassword")}
            helperText={getErrors("currentPassword")}
            type="password"
            variant="filled"
            className={classes.passwordField}
          />
          <Typography
            variant="caption"
            className={classes.forgotPasswordText}
            onClick={() => console.log("Clicked forgot password")}
          >
            Forgot password?
          </Typography>

          <TextField
            fullWidth
            name="newPassword"
            label="New password"
            onChange={onChange}
            value={formValues.newPassword}
            error={hasErrors("newPassword")}
            helperText={getErrors("newPassword")}
            type="password"
            variant="filled"
            className={classes.passwordField}
          />
          <Box display="flex">
            <Box flexGrow={1} />
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              disabled={isChangePasswordBtnDisabled}
              onClick={handlePasswordChangeClick}
            >
              Change
            </Button>
          </Box>
        </Box>
        <Box className={classes.termsContainer}>
          <Typography variant="subtitle1">Privacy & terms</Typography>
          <List>
            <ListItem className={classes.termsLink} button onClick={() => handleTermsItemClick("PrivacyPolicy")}>
              <ListItemIcon className={classes.termsLinkIcon}>
                <FileIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Privacy Policy"
                primaryTypographyProps={{
                  variant: "body2"
                }}
              />
            </ListItem>
            <ListItem className={classes.termsLink} button onClick={() => handleTermsItemClick("Terms")}>
              <ListItemIcon className={classes.termsLinkIcon}>
                <FileIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Terms of Service"
                primaryTypographyProps={{
                  variant: "body2"
                }}
              />
            </ListItem>
            <ListItem className={classes.termsLink} button onClick={() => handleTermsItemClick("CodeOfConduct")}>
              <ListItemIcon className={classes.termsLinkIcon}>
                <FileIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Community Code of Conduct"
                primaryTypographyProps={{
                  variant: "body2"
                }}
              />
            </ListItem>
          </List>
        </Box>
        <Container maxWidth="xs" className={classes.copyrightTextContainer}>
          <Typography variant="caption">
            Hunome™ 2008–2020
            <br />
            Copyright all rights reserved
            <br />
            Humanity making sense of itself™
          </Typography>
        </Container>
      </Container>
      {modalOpenType && <TermsConditionsModal onClose={handleTermsModalClose} modalOpenType={modalOpenType} />}

      <Snackbar open={showSnackbar} autoHideDuration={3500} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

const SettingsController = () => {
  const [{ fetching, data }] = useQuery({
    query: GET_PRIVATE_PROFILE
  });

  if (fetching) return <Loader variant="drawer" />;

  if (data) return <Settings membername={data.privateProfile.membername} />;

  return <Typography color="error">Error</Typography>;
};

export default React.memo(SettingsController);
