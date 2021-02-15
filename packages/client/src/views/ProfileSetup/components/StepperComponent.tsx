import { Container, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useMemo } from "react";

type StepperComponentProps = {
  children: (value: RenderFn) => React.ReactNode;
};

function getSteps() {
  return ["Create account", '"Hunome slang"', "Background", "Interests", "Knowtype", "Finishing touches"];
}

type RenderFn = {
  activeStep: number;
  steps: string[];
  handleNext: () => void;
  handleBack: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  completedStep: {
    fill: "#FF578C"
  },
  activeStep: {
    fill: "#FF578C"
  },
  text: {
    fill: "#ffffff",
    fontSize: "14px"
  }
}));

const StepperComponent = ({ children }: StepperComponentProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const value = useMemo(
    () => ({
      steps,
      activeStep,
      handleNext,
      handleBack,
      handleReset
    }),
    [activeStep, steps]
  );

  return (
    <Container maxWidth="lg">
      {activeStep <= 5 && (
        <Stepper activeStep={activeStep} style={{ background: "none" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    text: classes.text,
                    active: classes.activeStep,
                    completed: classes.completedStep
                  }
                }}
              >
                <Typography variant="body2">{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      {children(value)}
    </Container>
  );
};

export default StepperComponent;
