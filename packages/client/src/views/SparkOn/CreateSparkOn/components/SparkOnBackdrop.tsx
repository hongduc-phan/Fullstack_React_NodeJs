import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const DrawerWidth = 614;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "calc(100vh - 56px)",
    backgroundColor: "#FFE3EB"
  },
  sparkImage: {
    cursor: "initial",
    height: 340,
    filter: "brightness(0.65)"
  },
  sparkContent: {
    padding: 0,
    marginTop: theme.spacing(-5)
  },
  textContainer: {
    padding: theme.spacing(0, 1)
  },
  title: {
    position: "absolute",
    color: "white"
  },
  additionalTextFieldWrapper: {
    position: "absolute",
    marginTop: theme.spacing(7)
  },
  mainPointText: {
    paddingBottom: theme.spacing(3)
  },
  elaborationText: {
    height: "calc(100vh - 596px)",
    overflow: "auto"
  }
}));

type SparkOnBackdropProps = {
  spark: {
    backgroundImage?: string | null;
    title: string;
    description: string;
    body: string;
  };
  onSparkImageClick: () => void;
};

const SparkOnBackdrop = ({ spark, onSparkImageClick }: SparkOnBackdropProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} square>
      <CardActionArea disableRipple onClick={onSparkImageClick} aria-label="minimize-sparkon-form">
        <CardMedia className={classes.sparkImage} image={spark.backgroundImage ? spark.backgroundImage : ""} />
      </CardActionArea>
      <CardContent className={classes.sparkContent}>
        <Container className={classes.textContainer} style={{ maxWidth: DrawerWidth }}>
          <Box className={classes.title}>
            <Typography variant="h5">{spark.title}</Typography>
          </Box>
          <Box className={classes.additionalTextFieldWrapper}>
            <Box className={classes.mainPointText}>
              <Typography variant="subtitle2">{spark.description}</Typography>
            </Box>
            <Box className={classes.elaborationText}>
              <Typography variant="body1">{spark.body}</Typography>
            </Box>
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
};

export default React.memo(SparkOnBackdrop);
