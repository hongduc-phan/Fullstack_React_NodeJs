import { Box, Button, Grid, MobileStepper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as TermTutorial1 } from "assets/registrationIllustrations/term-tutorial-1.svg";
import { ReactComponent as TermTutorial2 } from "assets/registrationIllustrations/term-tutorial-2.svg";
import { ReactComponent as TermTutorial3 } from "assets/registrationIllustrations/term-tutorial-3.svg";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  headerText: {
    textAlign: "center"
  },
  content: {
    marginTop: theme.spacing(4)
  },
  descriptionText: {
    color: "rgba(0, 0, 0, 0.6)",
    letterSpacing: "0.15px",
    margin: "0 auto",
    marginTop: theme.spacing(6)
  },
  button: {
    fontSize: 14,
    padding: theme.spacing(0.5, 2)
  },
  stepper: {
    margin: "0 auto",
    marginTop: theme.spacing(7),
    maxWidth: 480,
    flexGrow: 1
  }
}));

type Props = {
  onNextClick: () => void;
};

const TermTutorial = ({ onNextClick }: Props) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      return;
    }
    onNextClick();
  };

  const { titleText, descriptionEl, illustrationEl: Illustration, nextBtnText } = items[activeIndex];

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" className={classes.headerText}>
        Quick intro to our "Hunome slang"
      </Typography>

      <Grid
        container
        wrap="wrap"
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.content}
      >
        <Grid item xs={6}>
          <Illustration />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{titleText}</Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.descriptionText}>
            {descriptionEl()}
          </Typography>
        </Grid>
      </Grid>

      <MobileStepper
        position="static"
        variant="dots"
        steps={3}
        activeStep={activeIndex}
        className={classes.stepper}
        nextButton={
          <Button color="primary" variant="contained" onClick={handleNext} size="medium">
            {nextBtnText}
          </Button>
        }
        backButton={
          <Button color="primary" variant="outlined" onClick={onNextClick} size="medium">
            Skip
          </Button>
        }
      />
    </Box>
  );
};

type TutorialItem = {
  index: number;
  titleText: string;
  illustrationEl: typeof TermTutorial1;
  descriptionEl: () => React.ReactNode;
  nextBtnText: string;
};

const items: TutorialItem[] = [
  {
    index: 0,
    titleText: "What is a Spark on Hunome?",
    illustrationEl: TermTutorial1,
    nextBtnText: "Next",
    descriptionEl: () => (
      <>
        <b>Sparks</b> are your ideas, thoughts — whatever comes to mind!{" "}
        <span role="img" aria-label="lightbulb">
          💡
        </span>{" "}
        <br />
        They can contain only a title or a lot more, images as well.
      </>
    )
  },
  {
    index: 1,
    titleText: "What is an Ignite on Hunome?",
    illustrationEl: TermTutorial2,
    nextBtnText: "OK, NICE",
    descriptionEl: () => (
      <>
        Sparks can be <b>ignited</b>.
        <br />
        <b>Ignites</b> are a way to describe qualities of the sparks — are they informative, useful or even funny{" "}
        <span role="img" aria-label="smile">
          😊
        </span>
      </>
    )
  },
  {
    index: 2,
    titleText: "What is a SparkOn on Hunome?",
    illustrationEl: TermTutorial3,
    nextBtnText: "GOT IT!",
    descriptionEl: () => (
      <>
        When you or others SparkOn from a Spark, they become connected. Many Sparks form SparkMaps bringing perspectives
        together{" "}
        <span role="img" aria-label="earth">
          🌍
        </span>
      </>
    )
  }
];

export default TermTutorial;
