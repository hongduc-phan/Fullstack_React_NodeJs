// TODO: use different ignite chips as per category type
import { Box, Chip as MuiChip } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";

type IgniteChipsByCategoryProps = {
  className?: string;
  selectedChips: string[];
  handleIgniteChipClick: (clickedChip: string) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1.5)
  }
}));

type ChipProps = {
  label: string;
  chipValue: string;
  isSelected: boolean;
  handleOnClick: (clickedChip: string) => void;
};

const Chip = React.memo(({ label, chipValue, isSelected, handleOnClick }: ChipProps) => {
  const classes = useStyles();

  return (
    <MuiChip
      label={label}
      clickable
      icon={isSelected ? <CheckIcon /> : undefined}
      onClick={() => handleOnClick(chipValue)}
      style={{ backgroundColor: isSelected ? "rgb(252,128,172)" : "rgba(0, 0, 0, 0.12)" }}
      className={classes.chip}
    />
  );
});

const IgniteChipsByCategory = ({ className, selectedChips, handleIgniteChipClick }: IgniteChipsByCategoryProps) => {
  const isSelected = (chipValue: string) => selectedChips.includes(chipValue);

  return (
    <Box className={className}>
      <Chip
        handleOnClick={handleIgniteChipClick}
        isSelected={isSelected("anthropology")}
        label="Anthropology"
        chipValue="anthropology"
      />
      <Chip handleOnClick={handleIgniteChipClick} isSelected={isSelected("art")} label="Art" chipValue="art" />
      <Chip
        handleOnClick={handleIgniteChipClick}
        isSelected={isSelected("biology")}
        label="Biology"
        chipValue="biology"
      />
      <Chip
        handleOnClick={handleIgniteChipClick}
        isSelected={isSelected("culture")}
        label="Culture"
        chipValue="culture"
      />
      <Chip
        handleOnClick={handleIgniteChipClick}
        isSelected={isSelected("curiosity")}
        label="Curiosity"
        chipValue="curiosity"
      />
      <Chip
        handleOnClick={handleIgniteChipClick}
        isSelected={isSelected("strategy")}
        label="Strategy"
        chipValue="strategy"
      />
      <Chip handleOnClick={handleIgniteChipClick} isSelected={isSelected("study")} label="Study" chipValue="study" />
      <Chip
        handleOnClick={handleIgniteChipClick}
        isSelected={isSelected("technology")}
        label="Technology"
        chipValue="technology"
      />
    </Box>
  );
};

export default React.memo(IgniteChipsByCategory);
