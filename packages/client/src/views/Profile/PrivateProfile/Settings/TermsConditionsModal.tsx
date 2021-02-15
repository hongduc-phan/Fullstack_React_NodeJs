import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TermsItem } from "./Settings";

const useStyles = makeStyles(() => ({
  formAction: {
    padding: 0,
    margin: "14px 16px"
  },
  imgGrid: {
    cursor: "pointer"
  }
}));

export type TermsConditionsModalProps = {
  onClose: () => void;
  modalOpenType: TermsItem;
};

const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({ onClose, modalOpenType }) => {
  const classes = useStyles();

  return (
    <Dialog open={true} maxWidth="xs" aria-label="terms-and-conditions-modal" disableBackdropClick onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h6">We need to be clear on some things with you</Typography>
      </DialogTitle>

      <DialogContent>
        {modalOpenType === "PrivacyPolicy" && (
          <Typography variant="body1" component="article" data-testid="privacy-policy-content">
            We take the protection of personal data very seriously. We commit to safeguarding the privacy of Hunome
            website visitors and service users.
            <p>
              Thus we handle your personal data as securely as possible. In doing so, we follow the privacy legislation.
              Hunome processes personal data on the basis of your consent. If you have any questions about our privacy
              policy, please contact us at hunome.com.
            </p>
            <p>
              We take the protection of personal data very seriously. We commit to safeguarding the privacy of Hunome
              website visitors and service users.
            </p>
            <p>
              Thus we handle your personal data as securely as possible. In doing so, we follow the privacy legislation.
            </p>
          </Typography>
        )}

        {modalOpenType === "Terms" && (
          <Typography variant="body1" component="article" data-testid="terms-content">
            Terms text (TBD)
          </Typography>
        )}

        {modalOpenType === "CodeOfConduct" && (
          <Typography variant="body1" component="article" data-testid="code-of-conduct-content">
            Code of Conduct text (TBD)
          </Typography>
        )}
      </DialogContent>

      <DialogActions className={classes.formAction}>
        <Button
          aria-label="close-terms-conditions-modal"
          variant="contained"
          autoFocus
          onClick={onClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(TermsConditionsModal);
