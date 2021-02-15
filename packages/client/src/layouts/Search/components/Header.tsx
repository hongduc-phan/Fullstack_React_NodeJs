import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "assets/icons";
import clsx from "clsx";
import React from "react";
import { ZINDICES } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    zIndex: ZINDICES.header,
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: theme.spacing(0, 3)
  }
}));

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} square className={clsx(className, classes.root)}>
      <Logo />
    </Paper>
  );
};

export default React.memo(Header);
