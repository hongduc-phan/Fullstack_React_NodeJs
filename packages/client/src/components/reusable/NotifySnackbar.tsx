import { Slide, Typography } from "@material-ui/core";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import React from "react";

type Props = {
  open: boolean;
  message: string;
  verticalAnchor?: SnackbarOrigin["vertical"];
  horizontalAnchor?: SnackbarOrigin["horizontal"];
  onClose: () => void;
};

const NotifySnackbar = ({ open, message, onClose, verticalAnchor, horizontalAnchor }: Props) => {
  return (
    <Snackbar
      style={{ right: 150 }}
      anchorOrigin={{ vertical: verticalAnchor ?? "bottom", horizontal: horizontalAnchor ?? "right" }}
      open={open}
      onClose={onClose}
      message={<Typography variant="body2">{message}</Typography>}
      autoHideDuration={2000}
      key={"snackbar"}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    />
  );
};

export default NotifySnackbar;
