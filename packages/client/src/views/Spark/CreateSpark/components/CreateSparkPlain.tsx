import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AddPhotoAlternate, Close as CloseIcon, Image as ImageIcon } from "@material-ui/icons";
import { SparkCircleComponent } from "components";
import { useForm } from "hooks";
import React, { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CreateSparkSparkOnFormState, IgniteGroup, SparkIgnite } from "types";
import { createSparkValidator } from "validations/formModels";
import { IgniteSelectionPlain } from "views/IgniteSelection";
import { SparkFormPlain } from "../CreateNewSpark/components";
import { CreateSparkMutationVariables } from "../EditDraftSpark/EditDraftSpark";
import ImageDialog from "./ImageDialog";

const DrawerWidth = "642px";

const useStyles = makeStyles((theme: Theme) => ({
  sparkpreviewContainer: {
    display: "flex",
    height: "calc(100vh - 80px)",
    alignItems: "center",
    justifyContent: "center"
  },
  drawer: {
    width: DrawerWidth,
    height: "100%",
    padding: 0
  },
  igniteDrawer: {
    top: 0
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  contentRoot: {
    padding: 0,
    height: "calc(100vh - 112px)",
    "& .MuiCardContent-root": {
      padding: 0
    }
  },
  contentMedia: {
    height: 340,
    filter: "brightness(0.65)"
  },
  grow: {
    flexGrow: 1
  },
  newImageSelectionIcon: {
    color: "white",
    position: "absolute",
    right: 12,
    top: 56,
    cursor: "pointer"
  }
}));

export type CreateSparkPlainProps = {
  initialFormState: CreateSparkSparkOnFormState;
  sparkBgImage?: string | null | undefined;
  ignites: IgniteGroup[];
  ignitesOnSpark?: SparkIgnite[];
  handlePublishClick: (variables: CreateSparkMutationVariables) => void;
};

const CreateSparkPlain = ({
  initialFormState,
  sparkBgImage,
  handlePublishClick,
  ignites,
  ignitesOnSpark
}: CreateSparkPlainProps) => {
  const classes = useStyles();

  const { formState, validationResult, onChange, onBlur, onFocus, resetForm } = useForm<CreateSparkSparkOnFormState>({
    initialFormState,
    validateFn: createSparkValidator,
    suiteName: "create_spark_sparkon"
  });

  const [uploadedImagePath, setUploadedImagePath] = useState<string | undefined | null>(sparkBgImage);

  const { values: formValues } = formState;
  const { hasErrors } = validationResult;

  const { title: titleText, main: mainText, elaboration: elaborationText } = formValues;

  // Image & image-selection dialog states
  const [openIgnite, setOpenIgnite] = useState(false);
  const [showImageSelection, setShowImageSelection] = useState(false);

  // Only render form as valid when both form texts and image upload are valid
  const isFormValid = !hasErrors() && !!uploadedImagePath ? true : false;

  const handleIgniteOpen = () => setOpenIgnite(true);
  const hanldeIgniteClose = () => setOpenIgnite(false);

  // Image selection state handlers
  const handleImageSelectionOpen = () => setShowImageSelection(true);
  const handleImageSelectionClose = () => setShowImageSelection(false);

  const handleImageSelection = (path: string) => {
    setUploadedImagePath(path);
    setShowImageSelection(false);
  };

  const handleCloseForm = useCallback(() => {
    setUploadedImagePath(null);
    resetForm();
  }, [resetForm]);

  const onPublishClick = async (ignites: string[]) => {
    const variables = {
      title: titleText,
      description: mainText,
      body: elaborationText,
      backgroundImage: uploadedImagePath,
      ignites
    };

    // TODO: Add loading and error states for publish actions
    handlePublishClick(variables);
  };

  const sparkData = {
    title: titleText,
    ignites: ignitesOnSpark ?? []
  };

  return (
    <Box>
      <Grid container>
        <Grid item lg={6} md={5}>
          <Container className={classes.sparkpreviewContainer}>
            <SparkCircleComponent renderedInSparkForm sparkTitle={titleText} backgroundImageSrc={uploadedImagePath} />
          </Container>
        </Grid>
        <Grid item>
          {openIgnite ? (
            <IgniteSelectionPlain
              filterJudgementIgnites={true}
              className={classes.igniteDrawer}
              spark={sparkData}
              ignites={ignites}
              onBackClick={hanldeIgniteClose}
              onPublishClick={onPublishClick}
            />
          ) : (
            <Drawer open={!openIgnite} anchor="right" variant="persistent">
              <Grid className={classes.drawer}>
                <AppBar color="inherit" position="sticky" elevation={3}>
                  <Toolbar style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <RouterLink to={`/sparkmap`}>
                      <IconButton edge="start" onClick={handleCloseForm} aria-label="Close form">
                        <CloseIcon />
                      </IconButton>
                    </RouterLink>
                    <Typography variant="h6" className={classes.title}>
                      New Spark
                    </Typography>
                    <Button disabled={!isFormValid} variant="outlined" color="primary" onClick={handleIgniteOpen}>
                      Next
                    </Button>
                  </Toolbar>
                </AppBar>

                <Card className={classes.contentRoot} square>
                  {uploadedImagePath && <CardMedia className={classes.contentMedia} image={uploadedImagePath} />}
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleImageSelectionOpen}
                    className={classes.newImageSelectionIcon}
                  >
                    <ImageIcon />
                  </IconButton>
                  <CardContent>
                    <SparkFormPlain
                      isImageRendered={!!uploadedImagePath}
                      onBlur={onBlur}
                      onChange={onChange}
                      onFocus={onFocus}
                      formState={formState}
                      validationResult={validationResult}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <AppBar position="sticky" color="inherit" elevation={4}>
                <Toolbar>
                  <div className={classes.grow} />
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleImageSelectionOpen}
                    disabled={!!uploadedImagePath}
                  >
                    <AddPhotoAlternate />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Drawer>
          )}
        </Grid>
      </Grid>

      {showImageSelection && (
        <ImageDialog
          open={showImageSelection}
          handleClose={handleImageSelectionClose}
          handleImageSelection={handleImageSelection}
        />
      )}
    </Box>
  );
};
export default React.memo(CreateSparkPlain);
