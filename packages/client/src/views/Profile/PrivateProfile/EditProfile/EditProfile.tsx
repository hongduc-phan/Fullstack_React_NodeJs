import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon, CameraAlt as CameraIcon, MoreVert as MoreIcon } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { SINGLE_UPLOAD_MUTATION, UPDATE_MEMBER_PROFILE } from "apollo/Mutations";
import { GET_IGNITES, GET_PRIVATE_PROFILE } from "apollo/Queries";
import clsx from "clsx";
import { CenteredComponent, Loader } from "components";
import { useAuthStore } from "contexts/AuthContext";
import { useForm } from "hooks";
import { debounce } from "lodash/fp";
import ChipInput from "material-ui-chip-input";
import { isEmpty } from "ramda";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { HEADER_HEIGHT, MemberPrivateProfile, MemberProfileUpdateInput, SIDEBAR_WIDTH } from "types";
import { useMutation, useQuery } from "urql";
import { getIgniteIdsByCategory, IgniteIdsByCategory } from "utils";
import BikChipsSection, { BikIgnitesOnProfileType } from "./components/BikChipsSection";
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
  avatarContainer: {
    position: "relative"
  },
  avatarImage: {
    // * We could add background color to have consistency in avatar image bg
    marginTop: theme.spacing(2),
    height: 120,
    borderRadius: "50%",
    width: 120
  },
  newAvatarSelection: {
    position: "absolute",
    color: "white",
    top: "48%",
    left: "6%",
    cursor: "pointer"
  },
  coverContainer: {
    position: "relative",
    marginTop: theme.spacing(6)
  },
  coverImage: {
    height: 175,
    borderRadius: 10,
    marginTop: theme.spacing(2)
  },
  newCoverSelection: {
    position: "absolute",
    color: "white",
    top: "50%",
    left: "46%",
    cursor: "pointer"
  },
  imgInput: {
    display: "none"
  },
  personalInfoContainer: {
    marginTop: theme.spacing(6)
  },
  inputField: {
    marginTop: 36,
    "&:first-of-type": {
      marginTop: 30
    }
  },
  websiteField: {
    ...theme.typography.body2,
    color: "#488CCF"
  },
  copyrightTextContainer: {
    textAlign: "center",
    margin: theme.spacing(8, "auto", 12, "auto"),
    color: "rgba(0, 0, 0, 0.38)"
  },
  emptyImg: {
    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.14))"
  }
}));

type EditProfileProps = {
  bikIgnites: IgniteIdsByCategory[];
  privateProfileData: MemberPrivateProfile;
};

type PersonalInfoFormState = {
  firstname: string;
  lastname: string;
  birthdate: string;
  aboutme: string;
  languages: string[];
  places: string[];
  website: string;
};

const EditProfile = ({ privateProfileData, bikIgnites }: EditProfileProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuthStore();

  const {
    firstname,
    lastname,
    birthdate,
    aboutme,
    languages,
    places,
    website,
    coverImageUrl,
    profilePictureUrl,
    background,
    interests,
    knowtypes
  } = privateProfileData;

  const personalInfoFormInitialState = {
    firstname: firstname ?? "",
    lastname: lastname ?? "",
    birthdate: birthdate ?? "",
    aboutme: aboutme ?? "",
    languages: languages ?? [],
    places: places ?? [],
    website: website ?? ""
  };

  const [avatarImg, setAvatar] = useState<any>(profilePictureUrl);
  const [coverImg, setCover] = useState<any>(coverImageUrl);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"info" | "success" | "warning" | "error">("info");
  const [uploadedImage, setUploadedImage] = useState<any>({
    profilePictureUrl: profilePictureUrl,
    coverImageUrl: coverImageUrl
  });
  const [personalInfoFormState, setPersonalInfoFormState] = useState<PersonalInfoFormState>(
    personalInfoFormInitialState
  );
  const [isSaveActionAllowed, setIsSaveActionAllowed] = useState(false);

  const handlePersonalInfoFormStateChange = useCallback((data: PersonalInfoFormState, isActionAllowed: boolean) => {
    setPersonalInfoFormState(data);
    setIsSaveActionAllowed(isActionAllowed);
  }, []);

  const [ignites, setIgnites] = useState({
    background,
    interests,
    knowtypes
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const bikIgnitesOnProfile = {
    background,
    interests,
    knowtypes
  } as BikIgnitesOnProfileType;

  const [, singleImageUpload] = useMutation(SINGLE_UPLOAD_MUTATION);
  const [, updateMemberProfile] = useMutation<MemberProfileUpdateInput>(UPDATE_MEMBER_PROFILE);

  const handleImageUploadChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { validity, files, name: fieldName } = e.target;

      const file = files && files[0];

      if (file && validity.valid) {
        const reader = new FileReader();

        const isAvatar = fieldName === "avatarImage";
        const isCover = fieldName === "coverImage";

        reader.onload = (e) => {
          const img = e.target?.result;
          if (isAvatar) setAvatar(img);
          if (isCover) setCover(img);
        };
        reader.readAsDataURL(file);

        const variables = { file };

        singleImageUpload(variables).then((response) => {
          const imgPath = response.data.singleUpload.url;

          if (isAvatar) setUploadedImage({ ...uploadedImage, profilePictureUrl: imgPath });
          if (isCover) setUploadedImage({ ...uploadedImage, coverImageUrl: imgPath });
        });
      }
    },
    [singleImageUpload, uploadedImage]
  );

  const handleIgnitesSelectionChange = useCallback((newValue: BikIgnitesOnProfileType) => setIgnites(newValue), []);

  const handleSnackbarClose = () => setShowSnackbar(false);

  const submitForm = async () => {
    const submitData: MemberProfileUpdateInput = {
      ...personalInfoFormState,
      background: ignites.background,
      interests: ignites.interests,
      knowtypes: ignites.knowtypes,
      profilePictureUrl: uploadedImage.profilePictureUrl,
      coverImageUrl: uploadedImage.coverImageUrl
    };

    try {
      const variables = { ...submitData };
      const response = await updateMemberProfile(variables);
      setSnackbarSeverity("success");
      setSnackbarMessage("Profile details updated successfully!");
      setShowSnackbar(true);
      history.push(`/profile/me`);
      console.log("Saved successfully", response);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Couldn't update profile details");
      setShowSnackbar(true);
      console.error("Couldn't update profile details", error);
    }
  };

  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleMenuClose();
    logout();
  };

  const handleBackIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    history.goBack();
  };

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
            Edit Profile
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            disabled={!isSaveActionAllowed}
            onClick={async () => {
              await submitForm();
            }}
          >
            Save
          </Button>
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
        <Box className={classes.avatarContainer}>
          <Typography variant="subtitle1">Profile picture</Typography>
          <CardMedia image={avatarImg} className={classes.avatarImage}>
            <Box className={clsx(classes.avatarImage, classes.emptyImg)} />
          </CardMedia>
          <label htmlFor="upload-avatar">
            <input
              accept="image/*"
              id="upload-avatar"
              name="avatarImage"
              type="file"
              className={classes.imgInput}
              onChange={handleImageUploadChange}
            />
            <IconButton
              color="inherit"
              aria-label="upload avatar"
              component="span"
              className={classes.newAvatarSelection}
            >
              <CameraIcon />
            </IconButton>
          </label>
        </Box>
        <Box className={classes.coverContainer}>
          <Typography variant="subtitle1">Cover image</Typography>
          <CardMedia image={coverImg} className={classes.coverImage}>
            <Box className={clsx(classes.coverImage, classes.emptyImg)} />
          </CardMedia>
          <label htmlFor="upload-cover-image">
            <input
              accept="image/*"
              id="upload-cover-image"
              name="coverImage"
              type="file"
              className={classes.imgInput}
              onChange={handleImageUploadChange}
            />
            <IconButton
              color="inherit"
              aria-label="upload cover image"
              component="span"
              className={classes.newCoverSelection}
            >
              <CameraIcon />
            </IconButton>
          </label>
        </Box>

        <PersonalInfoSection
          personalInfoFormState={personalInfoFormInitialState}
          handlePersonalInfoFormStateChange={handlePersonalInfoFormStateChange}
        />

        <BikChipsSection
          bikIgnites={bikIgnites}
          bikIgnitesOnProfile={bikIgnitesOnProfile}
          handleChipsSelection={handleIgnitesSelectionChange}
        />

        <Container maxWidth="xs" className={classes.copyrightTextContainer}>
          <Typography variant="caption">
            Hunome® 2008–2020
            <br />
            Copyright all rights reserved
            <br />
            Humanity making sense of itself™
          </Typography>
        </Container>

        <Snackbar open={showSnackbar} autoHideDuration={3500} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Drawer>
  );
};

type PersonalInfoSectionProps = {
  privateProfileData?: MemberPrivateProfile;
  handlePersonalInfoFormStateChange: (data: PersonalInfoFormState, isActionAllowed: boolean) => void;
  personalInfoFormState: PersonalInfoFormState;
};

const PersonalInfoSection = ({
  personalInfoFormState,
  handlePersonalInfoFormStateChange
}: PersonalInfoSectionProps) => {
  const classes = useStyles();

  const { formState, onChange, onFieldChange, validationResult } = useForm<PersonalInfoFormState>({
    initialFormState: personalInfoFormState,
    validateFn: validator,
    suiteName: "editprofile"
  });

  const isActionAllowedRef = useRef(false);

  const { values: formValues } = formState;
  const { getErrors, hasErrors } = validationResult;

  const isActionAllowed = useMemo(() => !isEmpty(formState.dirty) && !Boolean(hasErrors()), [
    formState.dirty,
    hasErrors
  ]);

  if (isActionAllowed !== isActionAllowedRef.current) {
    isActionAllowedRef.current = isActionAllowed;

    const debouncedFormStateChange = debounce(150, () =>
      handlePersonalInfoFormStateChange(formState.values, isActionAllowed)
    );
    debouncedFormStateChange();
  }

  return (
    <Box className={classes.personalInfoContainer}>
      <Typography variant="subtitle1">Personal information</Typography>

      <TextField
        fullWidth
        name="firstname"
        label="Name"
        value={formValues.firstname}
        onChange={onChange}
        error={hasErrors("firstname")}
        helperText={getErrors("firstname")}
        variant="filled"
        className={classes.inputField}
      />

      <TextField
        fullWidth
        name="birthdate"
        label="Birthday"
        type="date"
        value={formValues.birthdate}
        onChange={onChange}
        error={hasErrors("birthdate")}
        helperText={getErrors("birthdate")}
        variant="filled"
        className={classes.inputField}
      />

      <TextField
        fullWidth
        name="aboutme"
        label="Bio"
        value={formValues.aboutme}
        onChange={onChange}
        error={hasErrors("aboutme")}
        helperText={getErrors("aboutme")}
        variant="filled"
        multiline
        rows={2}
        className={classes.inputField}
      />

      <ChipInput
        fullWidth
        id="languages-field"
        label="Languages"
        variant="filled"
        onChange={(value) => onFieldChange("languages", value)}
        error={hasErrors("languages")}
        helperText={getErrors("languages")}
        defaultValue={formValues.languages}
        className={classes.inputField}
      />

      <ChipInput
        fullWidth
        id="places-field"
        label="Places I’ve lived in"
        variant="filled"
        onChange={(value) => onFieldChange("places", value)}
        error={hasErrors("places")}
        helperText={getErrors("places")}
        defaultValue={formValues.places}
        className={classes.inputField}
      />

      <TextField
        fullWidth
        name="website"
        label="Website"
        onChange={onChange}
        value={formValues.website}
        error={hasErrors("website")}
        helperText={getErrors("website")}
        variant="filled"
        inputProps={{
          className: classes.websiteField
        }}
        className={classes.inputField}
      />
    </Box>
  );
};

const EditProfileController = () => {
  const [{ data: privateProfileData, error: privateProfileErr, fetching: privateProfileLoading }] = useQuery({
    query: GET_PRIVATE_PROFILE
  });

  const [{ data: igniteQueryData, error: ignitesQueryErr, fetching: ignitesQueryLoading }] = useQuery({
    query: GET_IGNITES
  });

  if (privateProfileLoading || ignitesQueryLoading) return <Loader variant="drawer" />;
  if (privateProfileErr || ignitesQueryErr) return <CenteredComponent>Error...</CenteredComponent>;

  if (privateProfileData && igniteQueryData) {
    const BIK = ["background", "interests", "knowtypes"];
    const bikIgnites = getIgniteIdsByCategory(igniteQueryData.ignites)
      .filter((item) => BIK.includes(item.id))
      .sort((a, b) => a.id.localeCompare(b.id));

    return <EditProfile bikIgnites={bikIgnites} privateProfileData={privateProfileData!.privateProfile} />;
  }

  return null;
};

export default React.memo(EditProfileController);
