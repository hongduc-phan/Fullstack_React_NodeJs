import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ListAvatar from "assets/listAvatar.png";
import { format, parseISO } from "date-fns";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  avatarItem: {
    marginRight: theme.spacing(2)
  },

  avatar: {
    marginRight: theme.spacing(2),
    height: 52,
    width: 52
  }
}));

type SparkAuthoringMetaProps = {
  username: string;
  lastModifiedOn: string;
};

const SparkAuthoringMeta = ({ username, lastModifiedOn }: SparkAuthoringMetaProps) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="subtitle1">{username}</Typography>
        <Typography variant="body2" color="textSecondary">
          {format(parseISO(lastModifiedOn), "LLL dd, yyyy")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SparkAuthoringMeta;
