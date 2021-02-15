import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImg from "assets/avatar.png";
import { TopIgnitesBar } from "components";
import React from "react";
import { ResultCardWrapper, Topbar } from "./components";

interface Props {}

const useStyles = makeStyles((theme) => ({
  root: {},
  categoryTitle: {
    ...theme.typography.caption,
    display: "inline-block",
    fontWeight: 500,
    marginBottom: theme.spacing(1.5)
  },
  avatarImg: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  icon: {
    marginRight: "2px"
  },
  authorText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  sparkAuthorAvatar: {
    width: 40,
    height: 40
  }
}));

const OtherResultCard = () => {
  const classes = useStyles();

  return (
    <ResultCardWrapper>
      <Box>
        <Topbar sparksCount={100} ignitesCount={19} participantsCount={15} />
      </Box>

      <Box display="flex" flexDirection="row">
        <Avatar src={AvatarImg} className={classes.avatarImg} />
      </Box>

      <Box display="flex">
        <Avatar alt="something" src={AvatarImg} className={classes.sparkAuthorAvatar} />

        <Box marginLeft="16px">
          <Typography variant="body2">How Can a Stay at Home Mom Become a Freelance Writer?</Typography>
          <Typography variant="caption">Elna Cain</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="caption" className={classes.categoryTitle}>
          Top Ignites
        </Typography>

        <TopIgnitesBar
          topIgnites={[
            { id: "first", usageCount: 3 },
            { id: "belief", usageCount: 4 },
            { id: "anthropology", usageCount: 1 }
          ]}
        />
      </Box>
    </ResultCardWrapper>
  );
};

export default OtherResultCard;
