import { Box, CardMedia, Container, Drawer, IconButton, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image as ImageIcon } from "@material-ui/icons";
import clsx from "clsx";
import { CharacterCount } from "components/reusable";
import { UseFormState } from "hooks/useForm";
import React from "react";
import { CreateSparkSparkOnFormState, SIDEBAR_WIDTH, ZINDICES } from "types";
import { IVestResult } from "vest";

const useStyles = makeStyles((theme) => ({
  previousSparkTitle: {
    position: "absolute",
    top: 100,
    left: 16,
    color: "white"
  },
  drawer: {
    bottom: 0
  },
  minimizedForm: {
    left: "auto",
    width: SIDEBAR_WIDTH,
    height: 80,
    overflow: "hidden",
    borderRadius: "16px 16px 0 0",
    bottom: 56,
    zIndex: ZINDICES.minimizedSparkOnForm
  },
  maximizedForm: {
    top: 140,
    height: "auto"
  },
  expandedForm: {
    left: 0,
    margin: "0 auto"
  },
  root: {
    padding: 0
  },
  sparkImage: {
    marginBottom: "-72px",
    filter: "brightness(0.65)",
    height: 340
  },
  formContainer: {
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 1.5)
  },
  formInputWrapper: {
    paddingBottom: theme.spacing(3)
  },
  titleWrapper: {
    paddingBottom: theme.spacing(2)
  },
  title: {
    color: "black",
    fontSize: "1.5rem",
    lineHeight: 1.16,
    paddingBottom: theme.spacing(1.5)
  },
  mainPointText: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.7
  },
  elaborationText: {
    fontSize: "1.125rem",
    lineHeight: 1.56,
    letterSpacing: "0.5px"
  },
  newImageSelectionIcon: {
    color: "white",
    position: "absolute",
    right: 12,
    top: 5,
    cursor: "pointer"
  }
}));

export type SparkonFormPlainProps = {
  formState: UseFormState<CreateSparkSparkOnFormState>;
  validationResult: Pick<IVestResult, "hasErrors" | "getErrors">;
  isImageRendered?: boolean;
  handleFormDialogClickOpen: () => void;
  handleFormDialogClose: () => void;
  handleImageSelectionOpen: () => void;
  isFormExpanded?: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  open: boolean;
  sparkTitle: string;
  uploadedImagePath: string | null;
};

// Default exported React component
const SparkonFormPlain = ({
  formState,
  validationResult,
  handleFormDialogClickOpen,
  handleFormDialogClose,
  handleImageSelectionOpen,
  isFormExpanded = false,
  onBlur,
  onChange,
  onFocus,
  open,
  sparkTitle,
  uploadedImagePath
}: SparkonFormPlainProps) => {
  const classes = useStyles();
  const {
    values: { title, main, elaboration },
    focused,
    touched
  } = formState;

  const { getErrors, hasErrors } = validationResult;

  // Sparkon title should be black when form is minimized or when image is not selected
  const sparkOnTitleColor = !open || !uploadedImagePath ? "black" : "white";
  const sparkOnTitleLeftPosition = isFormExpanded ? "20vw" : 10;

  return (
    <>
      {open && (
        <Typography variant="h5" className={classes.previousSparkTitle} style={{ left: sparkOnTitleLeftPosition }}>
          {sparkTitle}
        </Typography>
      )}
      <Drawer
        anchor="bottom"
        variant="persistent"
        open={true}
        onClose={handleFormDialogClose}
        className={classes.drawer}
        PaperProps={{
          square: false,
          elevation: 0,
          // Control the height of sparkon form modal based on expanded state
          className: clsx(classes.minimizedForm, open && classes.maximizedForm, isFormExpanded && classes.expandedForm)
        }}
        BackdropProps={{
          invisible: true
        }}
      >
        <Container className={classes.root} maxWidth="lg">
          {open && uploadedImagePath && (
            <>
              {uploadedImagePath && (
                <CardMedia className={clsx(uploadedImagePath && classes.sparkImage)} image={uploadedImagePath} />
              )}
              <IconButton
                edge="end"
                size="small"
                color="inherit"
                onClick={handleImageSelectionOpen}
                className={classes.newImageSelectionIcon}
                aria-label="select-new-image"
              >
                <ImageIcon />
              </IconButton>
            </>
          )}
          <form className={classes.formContainer}>
            <Box className={clsx(classes.formInputWrapper, classes.titleWrapper)}>
              <InputBase
                name="title"
                placeholder="Title your Spark"
                fullWidth
                inputProps={{ "aria-label": "title-text", maxLength: 100 }}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onClick={() => handleFormDialogClickOpen()}
                value={title}
                className={classes.title}
                style={{ color: sparkOnTitleColor }}
              />
              {touched.title && (focused.title || hasErrors("title")) && (
                <CharacterCount characterCount={title.length ?? 0} error={getErrors("title")} maxCharacterCount={50} />
              )}
            </Box>
            <Box className={classes.formInputWrapper}>
              <InputBase
                name="main"
                placeholder="Your perspective (an observation, an idea, a thought, the main point...)"
                fullWidth
                inputProps={{ "aria-label": "main-text", maxLength: 320 }}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                value={main}
                className={classes.mainPointText}
              />
              {touched.main && (focused.main || hasErrors("main")) && (
                <CharacterCount characterCount={main.length ?? 0} error={getErrors("main")} maxCharacterCount={300} />
              )}
            </Box>
            <Box className={classes.formInputWrapper}>
              <InputBase
                name="elaboration"
                placeholder="If you wish you can elaborate on your perspective"
                multiline
                fullWidth
                rows={5}
                rowsMax={!!uploadedImagePath ? 13 : 20}
                inputProps={{ "aria-label": "elaboration-text", maxLength: 3050 }}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                value={elaboration}
                className={classes.elaborationText}
              />
              {touched.elaboration && (focused.elaboration || hasErrors("elaboration")) && (
                <CharacterCount
                  characterCount={elaboration.length ?? 0}
                  error={getErrors("elaboration")}
                  maxCharacterCount={3000}
                />
              )}
            </Box>
          </form>
        </Container>
      </Drawer>
    </>
  );
};

export default React.memo(SparkonFormPlain);
