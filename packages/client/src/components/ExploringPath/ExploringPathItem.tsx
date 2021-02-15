import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import type { BreadcrumbItem } from "./types";

type ExploringPathItemProps = {
  handleClick: (id: string) => void;
  isActive: boolean;
} & BreadcrumbItem;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    cursor: "pointer",
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    verticalAlign: "middle",
    marginRight: 8,
    position: "relative",
    bottom: 1
  },
  titleText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "60px"
  }
}));

const ExploringPathItem = ({ avatar, sparkTitle, sparkUrl, handleClick, isActive = false }: ExploringPathItemProps) => {
  const classes = useStyles();

  return (
    <Link component="button" onClick={() => handleClick(sparkTitle)} className={classes.root}>
      <img src={avatar} alt="Previous orbit" className={classes.icon} />
      <Typography
        color={isActive ? "textPrimary" : "textSecondary"}
        component="span"
        variant="body1"
        className={classes.titleText}
      >
        {sparkTitle}
      </Typography>
    </Link>
  );
};

export default React.memo(ExploringPathItem);
