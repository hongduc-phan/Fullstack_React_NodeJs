import { Box, Button, CardMedia, Container, Drawer, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close as CloseIcon, MoreVert as MoreIcon } from "@material-ui/icons";
import { GET_SPARK } from "apollo/Queries";
import DemoCoverImage from "assets/cover-image.jpg";
import { IgniteIcon, SparkOnIcon } from "assets/icons";
import { Loader } from "components";
import CenteredComponent from "components/CenteredComponent";
import IgniteReport, { SparkReportFormData } from "components/IgniteReport";
import React, { useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { HEADER_HEIGHT, RouteParams, SIDEBAR_WIDTH, Spark } from "types";
import { useQuery } from "urql";
import { isValidUuid } from "utils";
import SparkAuthoringMeta from "./SparkAuthoringMeta";

const RandomDate = new Date("2020-01-30").toISOString();

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    top: 0,
    height: 56
  },
  toolbar: {
    position: "relative",
    height: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContent: {
    marginTop: -56,
    overflowY: "auto",
    height: `calc(100vh - ${HEADER_HEIGHT}px)`
  },
  drawerPaper: {
    top: HEADER_HEIGHT,
    width: SIDEBAR_WIDTH
  },
  dialogTitle: {
    flex: 1,
    marginLeft: theme.spacing(2)
  },
  drawerContent: {
    padding: theme.spacing(1.5, 2)
  },
  coverImage: {
    height: 200
  },
  sparkActionBtnContainer: {
    display: "flex",
    marginTop: theme.spacing(1.5)
  },

  sparkActionBtn: {
    marginRight: theme.spacing(1)
  },
  authoringMetaContainer: {
    marginTop: theme.spacing(3.5)
  },
  descriptionText: {
    marginTop: theme.spacing(3.5)
  },
  bodyText: {
    marginTop: theme.spacing(3)
  }
}));

type ViewSparkProps = {
  activeSpark: Spark;
};

type SparkReportData =
  | SparkReportFormData
  | {
      meta: {
        sparkId: string;
        reportedBy: string;
        reportedOn: string;
      };
    };

const ViewSpark = ({ activeSpark }: ViewSparkProps) => {
  const classes = useStyles();
  const history = useHistory();

  const { id: sparkId, backgroundImage, title, description, body, member } = activeSpark;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [renderSparkReport, setRenderSparkReport] = useState(false);
  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleOpenSparkReportClick = () => {
    handleMenuClose();
    setRenderSparkReport(true);
  };

  const handleSparkReportCancel = () => {
    setRenderSparkReport(false);
  };

  const handleSparkOnClick = () => {
    history.push(`/sparkmap/sparkon/${sparkId}`);
  };

  const handleIgniteClick = () => {
    history.push(`/sparkmap/view-spark/${sparkId}/ignite-on-spark`);
  };

  const handleSparkReportSubmit = (formData: SparkReportFormData) => {
    setRenderSparkReport(false);

    const sparkReportData: SparkReportData = {
      ...formData,
      meta: {
        sparkId,
        reportedBy: member.id,
        reportedOn: new Date(Date.now()).toISOString()
      }
    };
    // TODO: This should be removed once gql mutation is ready
    console.log(sparkReportData);
  };

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="persistent"
      classes={{
        paper: classes.drawerPaper
      }}
      PaperProps={{
        elevation: 2
      }}
    >
      <Box display="flex" padding="10px 16px" alignItems="center" justifyContent="space-between">
        <Link to={`/sparkmap/sparkons-orbit/${sparkId}`}>
          <IconButton
            size="small"
            color="default"
            edge="start"
            aria-label="Close form"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.14)", color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Link>

        <IconButton
          size="small"
          edge="end"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.14)", color: "white" }}
          aria-label="open spark contextual menu"
          onClick={handleMenuIconClick}
        >
          <MoreIcon />
        </IconButton>

        <Menu
          id="spark contextual menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Invite</MenuItem>
          <MenuItem onClick={handleOpenSparkReportClick}>Report</MenuItem>
        </Menu>
      </Box>

      <Box className={classes.cardContent}>
        <CardMedia image={backgroundImage ? backgroundImage : DemoCoverImage} className={classes.coverImage} />
        <Container className={classes.drawerContent}>
          <Typography variant="h5">{title}</Typography>

          <Box className={classes.sparkActionBtnContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSparkOnClick}
              startIcon={<SparkOnIcon />}
              className={classes.sparkActionBtn}
            >
              Sparkon
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleIgniteClick}
              startIcon={
                <IgniteIcon
                  viewBox="0 0 18 18"
                  style={{
                    fontSize: "1.25rem"
                  }}
                />
              }
              className={classes.sparkActionBtn}
            >
              <Typography variant="button" color="primary">
                Ignite
              </Typography>
            </Button>
          </Box>
          <Box className={classes.authoringMetaContainer}>
            <SparkAuthoringMeta username={member?.membername ?? ""} lastModifiedOn={RandomDate} />
          </Box>

          <Typography variant="subtitle2" className={classes.descriptionText}>
            {description}
          </Typography>

          <Typography variant="body1" className={classes.bodyText}>
            {body}
          </Typography>
        </Container>
      </Box>
      {renderSparkReport && <IgniteReport onSubmit={handleSparkReportSubmit} onCancel={handleSparkReportCancel} />}
    </Drawer>
  );
};

const ViewSparkController = () => {
  const { sparkId }: RouteParams = useParams();
  const isValidSparkId = isValidUuid(sparkId);

  const [result] = useQuery({
    query: GET_SPARK,
    variables: { id: sparkId },
    pause: !isValidSparkId
  });

  if (!isValidUuid(sparkId)) return <Redirect to="/sparkmap" />;

  const { fetching, error, data } = result;

  if (fetching) return <Loader variant="drawer" />;

  if (data) {
    return (
      <CenteredComponent>
        <ViewSpark activeSpark={data.spark} />
      </CenteredComponent>
    );
  } else {
    console.log("Error in ViewSpark", error?.message);
    return <div>Some error</div>;
  }
};

export default React.memo(ViewSparkController);
