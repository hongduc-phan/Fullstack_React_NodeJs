import { Box, Card, CardMedia, Paper, Tooltip, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { SparkHoverComponent } from "components";
import React from "react";
import Connectors from "./Connectors";

const useStyles = makeStyles((theme: Theme) => ({
  spark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: 142,
    height: 142
  },
  sparkBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "100%",
    zIndex: 1,
    border: "4px solid #385B97"
  },
  sparkOnBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "100%"
  },
  sparkBodyInner: {
    borderRadius: "100%",
    width: 120,
    height: 120,
    margin: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sparkTitle: {
    position: "absolute",
    color: "black",
    width: 120,
    padding: theme.spacing(1, 1),
    overflow: "auto"
  },
  contentMedia: {
    height: 120,
    filter: "brightness(0.65)",
    borderRadius: "50%",
    width: 120
  },
  tooltip: {
    minWidth: 350,
    boxShadow: theme.shadows[3],
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white
  },
  cardWithMousePointer: {
    cursor: "pointer"
  }
}));

type SparkCircleProps = {
  renderedInSparkForm?: boolean;
  sparkTitle: string;
  sparkDescription?: string;
  author?: string;
  ignitesCount?: number;
  sparkonsCount?: number;
  sparkUrl?: string;
  backgroundImageSrc?: string | null;
  circleType?: "spark" | "sparkon";
  renderWithConnectors?: boolean;
  totalConnectors?: number;
  updatedDatetime?: string;
};

const SparkCircle = ({
  renderedInSparkForm = false,
  sparkTitle,
  sparkDescription,
  author,
  sparkonsCount,
  sparkUrl,
  ignitesCount,
  updatedDatetime,
  backgroundImageSrc,
  renderWithConnectors,
  circleType = "spark",
  totalConnectors
}: SparkCircleProps) => {
  const classes = useStyles();

  const sparkCardClass = circleType === "spark" ? classes.sparkBody : classes.sparkOnBody;
  return (
    <Box className={clsx(classes.spark, "centered-spark")}>
      <Tooltip
        enterDelay={500}
        disableHoverListener={renderedInSparkForm}
        interactive
        arrow
        disableFocusListener
        classes={{
          tooltip: classes.tooltip
        }}
        title={
          <SparkHoverComponent
            title={sparkTitle}
            description={sparkDescription}
            author={author}
            sparkUrl={sparkUrl}
            sparkonsCount={sparkonsCount}
            ignitesCount={ignitesCount}
            updatedDatetime={updatedDatetime}
          />
        }
      >
        <Card className={clsx(sparkCardClass, !renderedInSparkForm && classes.cardWithMousePointer)} elevation={3}>
          <Paper elevation={0} className={classes.sparkBodyInner}>
            <React.Fragment>
              {backgroundImageSrc && (
                <CardMedia image={backgroundImageSrc} className={classes.contentMedia}></CardMedia>
              )}
              <Typography
                variant="caption"
                className={classes.sparkTitle}
                style={{ color: backgroundImageSrc ? "#fff" : "#000" }}
              >
                {sparkTitle}
              </Typography>
            </React.Fragment>
          </Paper>
        </Card>
      </Tooltip>

      {renderWithConnectors && <Connectors totalConnectors={totalConnectors} />}
    </Box>
  );
};

export default React.memo(SparkCircle);
