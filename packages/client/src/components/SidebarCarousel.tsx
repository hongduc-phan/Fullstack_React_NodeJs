import { Box, Container, MobileStepper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "assets/icons";
import Welcome1 from "assets/registrationIllustrations/welcome1.svg";
import Welcome2 from "assets/registrationIllustrations/welcome2.svg";
import Welcome3 from "assets/registrationIllustrations/welcome3.svg";
import clsx from "clsx";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "0.2fr 1fr 0.1fr",
    gap: "1px 1px",
    gridTemplateAreas: '"header" "content" "footer"'
  },

  description: {
    marginTop: theme.spacing(4)
  },

  img: {
    display: "block",
    maxWidth: 400,
    margin: "0 auto"
  },
  stepperRoot: {
    justifyContent: "space-around"
  }
}));

type Props = {
  className?: string;
};

const SidebarCarousel = ({ className }: Props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = carouselItems.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box className={clsx(classes.root, className)} height="100vh" maxWidth={420}>
      <Box gridArea="header" display="flex" justifyContent="center" padding={4}>
        <Logo />
      </Box>

      <Box gridArea="content" mt={8}>
        <AutoPlaySwipeableViews axis="x" index={activeStep} onChangeIndex={handleStepChange} interval={10000}>
          {carouselItems.map(({ title, description, image }, index) => (
            <Container key={title}>
              {Math.abs(activeStep - index) <= 2 ? <img className={classes.img} src={image} alt={description} /> : null}
              <Box textAlign="center" mt={8}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle1" color="textSecondary" className={classes.description}>
                  {description}
                </Typography>
              </Box>
            </Container>
          ))}
        </AutoPlaySwipeableViews>
      </Box>

      <Box gridArea="footer" paddingBottom={3}>
        <MobileStepper
          classes={{
            root: classes.stepperRoot
          }}
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={undefined}
          backButton={undefined}
        />
      </Box>
    </Box>
  );
};

const carouselItems = [
  {
    image: Welcome1,
    title: "Explore new ideas, see things differently",
    description: "From ancient to novel, browse through perspectives."
  },
  {
    image: Welcome2,
    title: "All about the people",
    description: "From two cents to a full dollar – see what other people craft from your idea"
  },
  {
    image: Welcome3,
    title: "You will be Sparking soon",
    description:
      "On invitation you can create your profile, share 'Sparks', 'Ignite' Sparks, connect thoughts. Become part of humanity making sense of itself."
  }
];

export default React.memo(SidebarCarousel);
