// TODO: add snackbar notification for successful/error actions
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AddPhotoAlternate, Close as CloseIcon } from "@material-ui/icons";
import { CREATE_SPARKON } from "apollo/Mutations";
import { GET_IGNITES, GET_SPARK } from "apollo/Queries";
import cx from "clsx";
import { useForm } from "hooks";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  CreateSparkOnInput,
  CreateSparkSparkOnFormState,
  HEADER_HEIGHT,
  IgniteGroup,
  RouteParams,
  SIDEBAR_WIDTH,
  Spark
} from "types";
import { useMutation, useQuery } from "urql";
import { createSparkValidator } from "validations/formModels";
import { IgniteSelectionPlain } from "views/IgniteSelection";
import { ImageDialog } from "views/Spark/CreateSpark/components";
import { defaultSparkFormState } from "views/Spark/CreateSpark/CreateNewSpark/CreateNewSpark";
import { SparkOnBackdrop, SparkonFormPlain } from "./components";

type MutationVariables = CreateSparkOnInput;

type CreateSparkPlainProps = {
  spark: Spark;
  ignites: IgniteGroup[];
  handlePublishClick: (variables: MutationVariables) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    padding: 0,
    marginTop: -HEADER_HEIGHT
  },
  drawerPaper: {
    top: HEADER_HEIGHT,
    width: SIDEBAR_WIDTH
  },
  toolbar: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "transparent"
  },
  icon: {
    color: "white",
    margin: theme.spacing(0, 1.5),
    backgroundColor: "rgba(0, 0, 0, 0.16)"
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  appBar: {
    top: "auto",
    bottom: 72
  },
  sidebarFormBottomAppBar: {
    width: SIDEBAR_WIDTH
  },
  grow: {
    flexGrow: 1
  }
}));

const CreateSparkOnPlain = ({ handlePublishClick, spark, ignites }: CreateSparkPlainProps) => {
  const classes = useStyles();

  const { formState, validationResult, onChange, onBlur, onFocus } = useForm<CreateSparkSparkOnFormState>({
    initialFormState: defaultSparkFormState,
    validateFn: createSparkValidator,
    suiteName: "create_spark_sparkon"
  });

  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

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

  // Sparkon Form dialog modal
  const [openFormDialog, setOpenFormDialog] = React.useState(true);

  const handleFormDialogClickOpen = () => setOpenFormDialog(true);
  const handleFormDialogClose = () => setOpenFormDialog(false);

  const handleImageSelection = (path: string) => {
    setUploadedImagePath(path);
    setShowImageSelection(false);
  };

  const onPublishClick = (selectedChips: string[]) => {
    const variables = {
      sparkmapId: spark.sparkmap.id,
      parentSparkId: spark.id,
      title: titleText,
      description: mainText,
      body: elaborationText,
      backgroundImage: uploadedImagePath,
      ignites: selectedChips ?? []
    };

    handlePublishClick(variables);
  };

  const sparkData = {
    title: titleText,
    ignites: []
  };

  return (
    <>
      {openIgnite ? (
        <IgniteSelectionPlain
          filterJudgementIgnites={true}
          spark={sparkData}
          ignites={ignites}
          onBackClick={hanldeIgniteClose}
          onPublishClick={onPublishClick}
        />
      ) : (
        <Drawer
          open={!openIgnite}
          anchor="right"
          variant="persistent"
          classes={{
            paper: classes.drawerPaper
          }}
          PaperProps={{
            elevation: 2
          }}
        >
          <Container className={classes.drawer}>
            <AppBar color="transparent" position="sticky" elevation={0}>
              <Box display="flex" padding="10px 16px">
                <Link to={`/sparkmap/sparkons-orbit/${spark.id}`}>
                  <IconButton className={classes.icon} size="small" edge="start" aria-label="Close form">
                    <CloseIcon />
                  </IconButton>
                </Link>
                <Box
                  flexGrow="1"
                  onClick={handleFormDialogClose}
                  style={{
                    cursor: openFormDialog ? "pointer" : "default"
                  }}
                />
                <Button
                  variant={!isFormValid ? "contained" : "outlined"}
                  color="primary"
                  aria-label="Publish button"
                  disabled={!isFormValid}
                  onClick={handleIgniteOpen}
                >
                  Next
                </Button>
              </Box>
            </AppBar>
            <SparkOnBackdrop spark={spark} onSparkImageClick={handleFormDialogClose} />
          </Container>
          <SparkonFormPlain
            open={openFormDialog}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            sparkTitle={spark.title}
            handleFormDialogClose={handleFormDialogClose}
            handleFormDialogClickOpen={handleFormDialogClickOpen}
            handleImageSelectionOpen={handleImageSelectionOpen}
            formState={formState}
            validationResult={validationResult}
            uploadedImagePath={uploadedImagePath}
          />
          <AppBar
            position="sticky"
            color="inherit"
            elevation={4}
            className={cx(classes.appBar, classes.sidebarFormBottomAppBar)}
          >
            <Toolbar>
              <div className={classes.grow} />
              <IconButton
                edge="end"
                color="inherit"
                aria-label="Select image for sparkon"
                onClick={handleImageSelectionOpen}
                disabled={!!uploadedImagePath}
              >
                <AddPhotoAlternate />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Drawer>
      )}

      {showImageSelection && (
        <ImageDialog
          open={showImageSelection}
          handleClose={handleImageSelectionClose}
          handleImageSelection={handleImageSelection}
        />
      )}
    </>
  );
};

const CreateSparkOn = () => {
  const history = useHistory();
  const { sparkId }: RouteParams = useParams();

  // GraphQL mutation to create sparkon
  const [, createSparkon] = useMutation<Spark, CreateSparkOnInput>(CREATE_SPARKON);

  const [{ fetching, data }] = useQuery<{ spark: Spark }>({
    query: GET_SPARK,
    variables: { id: sparkId }
  });

  const [{ fetching: fetchingIgnites, error: erroredGetIgnites, data: ignitesData }] = useQuery<{
    ignites: IgniteGroup[];
  }>({ query: GET_IGNITES });

  const handlePublishClick = (variables: MutationVariables) => {
    createSparkon({ ...variables })
      .then(() => {
        history.push(`/sparkmap/sparkons-orbit/${sparkId}`);
      })
      .catch((err) => {
        console.error("Error creating Spark on", err);
      });
  };

  if (fetching || fetchingIgnites) return <div>Loading...</div>;

  if (data && ignitesData) {
    const activeSpark = data.spark;
    const ignites = ignitesData.ignites;

    return <CreateSparkOnPlain handlePublishClick={handlePublishClick} spark={activeSpark!} ignites={ignites} />;
  }

  return <Typography>Encountered some error...</Typography>;
};

export default React.memo(CreateSparkOn);
