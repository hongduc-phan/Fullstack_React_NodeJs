import { Chip as MuiChip, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Check as CheckIcon } from "@material-ui/icons";
import React from "react";

type ChipProps = {
  clickable?: boolean;
  chipLabel: string;
  isSelected?: boolean;
  onClick?: (clickedChip: string) => void;
  capitalizeLabel?: boolean;
  withIcon?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    color: "rgba(0, 0, 0, 0.87)",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1.5)
  }
}));

const IgniteChip = React.memo(
  ({
    clickable = false,
    chipLabel,
    isSelected = false,
    onClick = () => {},
    capitalizeLabel = false,
    withIcon = false
  }: ChipProps) => {
    const classes = useStyles();

    return (
      <MuiChip
        clickable={clickable}
        label={<Typography variant="body2">{chipLabel}</Typography>}
        className={classes.chip}
        icon={isSelected && withIcon ? <CheckIcon /> : undefined}
        onClick={() => (clickable ? onClick(chipLabel) : {})}
        style={{
          textTransform: capitalizeLabel ? "capitalize" : "unset",
          backgroundColor: isSelected ? "rgb(254,224,235)" : "rgba(0, 0, 0, 0.12)"
        }}
      />
    );
  }
);

export default React.memo(IgniteChip);
