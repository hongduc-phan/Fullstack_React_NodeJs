import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

export type CharacterCountProps = {
  characterCount?: number;
  error: string[];
  maxCharacterCount?: number;
};

const useStyles = makeStyles(() => ({
  characterCount: {
    display: "flex",
    justifyContent: "space-between",
    letterSpacing: "0.4px"
  }
}));

const CharacterCount = ({ characterCount = 0, error = [], maxCharacterCount = 50 }: CharacterCountProps) => {
  const classes = useStyles();
  return (
    <Typography
      data-testid="character-count"
      color={error.length ? "error" : "inherit"}
      component="div"
      variant="caption"
      className={classes.characterCount}
    >
      <Box component="span">{error}</Box>
      <Box component="span">
        {characterCount}/{maxCharacterCount}
      </Box>
    </Typography>
  );
};

export default React.memo(CharacterCount);
