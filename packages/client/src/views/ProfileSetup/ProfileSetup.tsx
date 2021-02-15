import { Box, Container, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CodeofConduct, Legal } from "components/TermsComponents";
import React from "react";
import { BIKSelections, ProfileInfoSection, StepperComponent, TermTutorial } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  termsWrapper: {
    height: "76vh",
    marginTop: theme.spacing(4)
  }
}));

const ProfileSetup = () => {
  const classes = useStyles();
  return (
    <StepperComponent>
      {({ activeStep, handleBack, handleNext }) => {
        const buttonActionsCb = { onBackClick: handleBack, onNextClick: handleNext };
        return (
          <Container maxWidth="md">
            {activeStep === 1 && <TermTutorial onNextClick={handleNext} />}
            {[2, 3, 4].includes(activeStep) && <BIKSelections {...buttonActionsCb} />}
            {activeStep === 5 && <ProfileInfoSection {...buttonActionsCb} />}

            {activeStep === 6 && (
              <Box className={classes.termsWrapper}>
                <Legal {...buttonActionsCb} />
              </Box>
            )}

            {/* Add action to update profile upon clicking Done in Code of Conduct view */}

            {activeStep === 7 && (
              <Box className={classes.termsWrapper}>
                <CodeofConduct {...buttonActionsCb} />
              </Box>
            )}
          </Container>
        );
      }}
    </StepperComponent>
  );
};

export default ProfileSetup;
