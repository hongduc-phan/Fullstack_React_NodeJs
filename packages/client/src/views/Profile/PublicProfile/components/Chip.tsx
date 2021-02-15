import { Chip as MuiChip } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { ActivityTabsType } from "types";

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: theme.spacing(0, 1.5, 2, 0)
  },
  activeChip: {
    color: "#FD2772",
    padding: theme.spacing(0.95, 1.5, 0.95, 1.25)
  },
  checkIcon: {
    width: 18,
    height: 18
  }
}));

type Props = {
  label: string;
  activityTab: ActivityTabsType;
  activeActivityTab?: ActivityTabsType;
  handleOnClick: (activityTab: ActivityTabsType) => void;
};

const Chip: React.FC<Props> = ({ label, activityTab, activeActivityTab, handleOnClick }) => {
  const classes = useStyles();
  const isActive = activeActivityTab === activityTab;

  return (
    <MuiChip
      label={label}
      clickable
      onClick={() => handleOnClick(activityTab)}
      style={{ backgroundColor: isActive ? "rgb(254,224,235)" : "rgba(0, 0, 0, 0.12)" }}
      className={clsx(classes.chip, isActive && classes.activeChip)}
    />
  );
};

Chip.defaultProps = {
  activeActivityTab: "Drafts"
};

export default Chip;
