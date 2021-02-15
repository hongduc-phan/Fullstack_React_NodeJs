import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersonOutline as PersonOutlineIcon } from "@material-ui/icons";
import { IgniteIcon, SparkIcon } from "assets/icons";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    marginRight: "2px"
  }
}));

type Props = {
  className?: string;
  ignitesCount: number;
  sparksCount: number;
  participantsCount: number;
};

const Topbar = ({ className, sparksCount = 0, ignitesCount = 0, participantsCount = 0 }: Props) => {
  const classes = useStyles();

  return (
    <Box
      display="inline-grid"
      gridTemplateColumns="repeat(3, 1fr) 50px"
      gridGap="0 5px"
      className={clsx(classes.root, className)}
    >
      <Box display="inline-flex" alignItems="center">
        <SparkIcon viewBox="0 -1 18 18" fontSize="small" className={classes.icon} />
        <Typography variant="body2">{sparksCount} Sparks</Typography>
      </Box>

      <Box display="inline-flex" alignItems="center">
        <IgniteIcon viewBox="-2 0 18 18" fontSize="small" className={classes.icon} />
        <Typography variant="body2">{ignitesCount} Ignites</Typography>
      </Box>

      <Box display="inline-flex" alignItems="center">
        <PersonOutlineIcon fontSize="small" className={classes.icon} />
        <Typography variant="body2">{participantsCount} Participants</Typography>
      </Box>
    </Box>
  );
};

export default Topbar;
