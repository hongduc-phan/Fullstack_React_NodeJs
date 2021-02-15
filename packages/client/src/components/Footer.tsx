import { Box, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import LinkComponent from "./LinkComponent";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "0 auto"
  }
}));

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  const classes = useStyles();

  return (
    <Box component="footer" className={clsx(classes.root, className)}>
      {/* TODO: Update about page/view */}

      <LinkComponent to="#">About</LinkComponent>
      <LinkComponent to="/terms/privacy-policy">Privacy Policy</LinkComponent>
      <LinkComponent to="/terms">Terms of Service</LinkComponent>
      <LinkComponent to="/terms/code-of-conduct">Community Code of Conduct</LinkComponent>
      <LinkComponent to="/terms/cookies-policy">Cookie Policy</LinkComponent>

      <Typography variant="caption">© 2020 Hunome®</Typography>
    </Box>
  );
};

export default Footer;
