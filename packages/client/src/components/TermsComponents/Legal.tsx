import { Box, Button, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { LinkComponent } from "components";
import React, { useState } from "react";

const TEXT_CONTENT_HEIGHT = "40vh";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  textContent: {
    height: TEXT_CONTENT_HEIGHT,
    overflowY: "auto",
    padding: theme.spacing(0, 3),
    fontSize: 14,
    letterSpacing: 0.25
  },
  headerText: {
    height: theme.spacing(5),
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2.5)
  },
  nextBtn: {
    borderRadius: 9999
  },
  actionsContainer: {
    position: "absolute",
    width: "100%",
    bottom: theme.spacing(0),
    paddingLeft: theme.spacing(2)
  },
  buttonContainer: {
    paddingTop: theme.spacing(5)
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    margin: theme.spacing(0, -1.25),
    "& li": {
      flex: "1 1 auto",
      margin: theme.spacing(0.75)
    }
  },
  actionListItem: {
    paddingTop: theme.spacing(2)
  }
}));

type Props = {
  onBackClick?: () => void;
  onNextClick?: () => void;
};

const Legal = ({ onBackClick = () => {}, onNextClick = () => {} }: Props) => {
  const classes = useStyles();

  const [isChecked, setIsChecked] = useState({
    terms: false,
    privacyPolicy: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked({ ...isChecked, [event.target.name]: event.target.checked });
  };

  const isNextActionDisabled = !isChecked.terms || !isChecked.privacyPolicy;

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.headerText}>
        We need to be clear on some things with you
      </Typography>

      <div className={classes.textContent}>
        <Typography variant="body2" component="div">
          <p>
            To make sense of our humanness, Hunomics Ltd (Hunome.com) collects personal data to provide and improve our
            services.
            <LinkComponent variant="body2" to="/terms/privacy-policy">
              Our Privacy Policy
            </LinkComponent>
            outlines:
          </p>

          <ul className={classes.listContainer}>
            <li>what personal data we collect,</li>
            <li>how we use and handle your data when you use the Hunome platform and services,</li>
            <li>how we store your data,</li>
            <li>how we protect your data against misuse,</li>
            <li>and what rights you have with regard to the personal data you provide us.</li>
          </ul>

          <p>
            We take the protection of personal data very seriously and commit to safeguarding the privacy of Hunome
            service users. Under the EU GDPR, we process persaonal data on the basis of your consent, which you can
            amend at any time by [x].
          </p>
          <p>If you have any questions about our Privacy Policy, please contact us at privacy@hunome.com.</p>
          <p>This privacy statement was last amended in July 2020.</p>
        </Typography>
      </div>

      <Box className={classes.actionsContainer}>
        <Box display="flex" flexDirection="column" pl={2}>
          <FormControlLabel
            control={<Checkbox color="primary" checked={isChecked.terms} onChange={handleChange} name="terms" />}
            label={
              <Typography variant="body2">
                I agree to
                <LinkComponent disablePadding variant="body2" to="/terms">
                  Terms of Service
                </LinkComponent>
              </Typography>
            }
            classes={{
              root: classes.actionListItem
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={isChecked.privacyPolicy}
                onChange={handleChange}
                name="privacyPolicy"
              />
            }
            label={
              <Typography variant="body2">
                I agree to
                <LinkComponent variant="body2" to="/terms/privacy-policy">
                  Privacy Policy
                </LinkComponent>
              </Typography>
            }
            classes={{
              root: classes.actionListItem
            }}
          />
        </Box>

        <Box
          className={classes.buttonContainer}
          display="flex"
          justifyContent="space-between"
          alignItems="space-between"
        >
          <Button color="secondary" size="large" onClick={onBackClick}>
            Back
          </Button>
          <Button
            className={classes.nextBtn}
            variant="contained"
            color="primary"
            size="large"
            onClick={onNextClick}
            disabled={isNextActionDisabled}
          >
            Agree & Continue
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Legal;
