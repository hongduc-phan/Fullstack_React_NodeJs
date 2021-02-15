import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  MobileStepper,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CameraAlt as CameraIcon } from "@material-ui/icons";
import { SINGLE_UPLOAD_MUTATION } from "apollo/Mutations";
import clsx from "clsx";
import { useProfileSetupStore } from "contexts";
import { useForm } from "hooks";
import ChipInput from "material-ui-chip-input";
import { isNil } from "ramda";
import React, { useState } from "react";
import { useMutation } from "urql";
import validator from "./validate";

type Props = {
  onNextClick: () => void;
  onBackClick: () => void;
};

type ProfileInfoSectionFormState = {
  firstname: string;
  lastname: string;
  birthdate: string;
  aboutme: string;
  languages: string[];
  places: string[];
  website: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  headerText: {
    textAlign: "center"
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    alignItems: "center",
    width: 560,
    marginTop: theme.spacing(8)
  },
  avatarContainer: {
    position: "relative"
  },
  avatarImage: {
    marginTop: theme.spacing(2),
    height: 120,
    borderRadius: "50%",
    width: 120,
    backgroundSize: "cover"
  },
  emptyImg: {
    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.14))"
  },
  newAvatarSelection: {
    position: "absolute",
    color: "white",
    top: "48%",
    left: "30%",
    cursor: "pointer"
  },
  imgInput: {
    display: "none"
  },
  coverContainer: {
    position: "relative",
    width: "100%",
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

  // Personal information
  formContainer: {
    width: "100%",
    marginTop: theme.spacing(8)
  },
  stepper: {
    margin: "0 auto",
    marginTop: theme.spacing(6),
    maxWidth: 480,
    flexGrow: 1
  },
  websiteField: {
    ...theme.typography.body2,
    color: "#488CCF"
  }
}));

type ImageState = {
  file: null | File;
  imagePreview: string | ArrayBuffer;
  uploadedImgPath: string | undefined;
};

const TabNames = ["images_selection", "profile_info_1", "profile_info_2"];
const NextBtnTexts: string[] = ["Next", "Next", "Done"];

const ProfileInfoSection = ({ onNextClick, onBackClick }: Props) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(1);

  const { dispatch: dispatchProfileSetup, profileSetupFormState } = useProfileSetupStore();

  const [avatarImg, setAvatarImg] = useState<ImageState>({
    file: null,
    imagePreview: "",
    uploadedImgPath: undefined
  });

  const [coverImg, setCoverImg] = useState<ImageState>({
    file: null,
    imagePreview: "",
    uploadedImgPath: undefined
  });

  const [, singleImageUpload] = useMutation(SINGLE_UPLOAD_MUTATION);

  const { formState, validationResult, onChange, onFieldChange, runValidate } = useForm<ProfileInfoSectionFormState>({
    initialFormState: { ...profileSetupFormState },
    validateFn: validator,
    suiteName: "profileInfoSection",
    groupName: TabNames[activeIndex]
  });

  const { values: formValues } = formState;
  const { getErrors, hasErrors, hasErrorsByGroup } = validationResult;

  const handleNext = () => {
    const isValidForGroup = runValidate();

    if (isValidForGroup) {
      if (activeIndex < NextBtnTexts.length - 1) {
        setActiveIndex((prevIndex) => prevIndex + 1);
        return;
      }

      if (activeIndex === 2) {
        dispatchProfileSetup({
          type: "PersonalInfo",
          payload: {
            profilePictureUrl: avatarImg.uploadedImgPath as string,
            coverImageUrl: coverImg.uploadedImgPath as string,
            ...formValues,
            birthdate: formValues.birthdate
          }
        });
      }

      onNextClick();
    }
  };

  const _handleBackClick = () => {
    if (activeIndex !== 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
      return;
    }
    onBackClick();
  };

  const _handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files, name: fieldName } = e.target;

    const isAvatar = fieldName === "avatarImage";
    const isCover = fieldName === "coverImage";

    let reader = new FileReader();
    const file = files ? files[0] : null;

    // avatar & cover image previews
    reader.onloadend = () => {
      const imagePreview = reader.result ?? "";

      !isNil(file) && isAvatar && setAvatarImg((prevState) => ({ ...prevState, file, imagePreview }));
      !isNil(file) && isCover && setCoverImg((prevState) => ({ ...prevState, file, imagePreview }));
    };

    reader.readAsDataURL(files![0]);

    // upload avatar & cover images
    const variables = { file };

    singleImageUpload(variables).then((response) => {
      const imgPath = response.data.singleUpload.url;

      if (isAvatar) setAvatarImg((prevState) => ({ ...prevState, uploadedImgPath: imgPath }));
      if (isCover) setCoverImg((prevState) => ({ ...prevState, uploadedImgPath: imgPath }));
    });
  };

  const isNextBtndisabled =
    (activeIndex === 0 && !avatarImg.uploadedImgPath) || hasErrorsByGroup(TabNames[activeIndex]);

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" className={classes.headerText}>
        Let’s check your profile
      </Typography>

      <Box>
        {activeIndex === 0 && (
          <Box className={classes.imagesContainer}>
            <Box className={classes.avatarContainer}>
              <Typography variant="subtitle1">Profile picture</Typography>
              <CardMedia image={avatarImg.imagePreview as string} className={classes.avatarImage}>
                <Box className={clsx(classes.avatarImage, classes.emptyImg)} />
              </CardMedia>
              <label htmlFor="upload-avatar">
                <input
                  accept="image/*"
                  id="upload-avatar"
                  name="avatarImage"
                  type="file"
                  className={classes.imgInput}
                  onChange={_handleImageChange}
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
              <CardMedia image={coverImg.imagePreview as string} className={classes.coverImage}>
                <Box className={clsx(classes.coverImage, classes.emptyImg)} />
              </CardMedia>
              <label htmlFor="upload-cover-image">
                <input
                  accept="image/*"
                  id="upload-cover-image"
                  name="coverImage"
                  type="file"
                  className={classes.imgInput}
                  onChange={_handleImageChange}
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
          </Box>
        )}

        {activeIndex === 1 && (
          <Grid className={classes.formContainer}>
            <Typography gutterBottom variant="subtitle1">
              Personal Information
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="firstname"
                  label="First name"
                  value={formValues.firstname ?? ""}
                  onChange={onChange}
                  error={hasErrors("firstname")}
                  helperText={getErrors("firstname")}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="lastname"
                  label="Last name"
                  value={formValues.lastname ?? ""}
                  onChange={onChange}
                  error={hasErrors("lastname")}
                  helperText={getErrors("lastname")}
                  variant="filled"
                />
              </Grid>

              <Grid item xs={6}>
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="aboutme"
                  label="Bio"
                  value={formValues.aboutme ?? ""}
                  onChange={onChange}
                  error={hasErrors("aboutme")}
                  helperText={
                    getErrors("aboutme").length
                      ? getErrors("aboutme")
                      : "You can edit this anytime later in your profile"
                  }
                  variant="filled"
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {activeIndex === 2 && (
          <Grid className={classes.formContainer}>
            <Typography gutterBottom variant="subtitle1">
              Personal Information
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <ChipInput
                  fullWidth
                  id="languages-field"
                  label="Languages"
                  variant="filled"
                  onChange={(value) => onFieldChange("languages", value)}
                  error={hasErrors("languages")}
                  helperText={getErrors("languages")}
                  defaultValue={formValues.languages}
                />
              </Grid>

              <Grid item xs={12}>
                <ChipInput
                  fullWidth
                  id="places-field"
                  label="Places"
                  variant="filled"
                  onChange={(value) => onFieldChange("places", value)}
                  error={hasErrors("places")}
                  helperText={getErrors("places")}
                  defaultValue={formValues.places}
                />
              </Grid>

              <Grid item xs={12}>
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
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>

      <MobileStepper
        position="static"
        variant="dots"
        steps={3}
        activeStep={activeIndex}
        className={classes.stepper}
        nextButton={
          <Button color="primary" variant="contained" onClick={handleNext} size="medium" disabled={isNextBtndisabled}>
            {NextBtnTexts[activeIndex]}
          </Button>
        }
        backButton={
          <Button color="primary" variant="outlined" onClick={_handleBackClick} size="medium">
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default ProfileInfoSection;
