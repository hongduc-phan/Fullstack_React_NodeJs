import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Variant } from "@material-ui/core/styles/createTypography";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type FooterLinkComponentProps = {
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
  disablePadding?: boolean;
  to: string;
};

const useStyles = makeStyles(() => ({
  buttonLink: {
    "&:active": {
      textDecoration: "none"
    }
  }
}));

const LinkComponent = ({
  className,
  children,
  to,
  variant = "caption",
  disablePadding = false
}: FooterLinkComponentProps) => {
  const classes = useStyles();

  return (
    <Link
      variant={variant}
      component={RouterLink}
      to={to}
      rel="noopener"
      target="_blank"
      color="textSecondary"
      style={{
        padding: disablePadding ? 0 : "0 8px"
      }}
      className={clsx(classes.buttonLink, className)}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
