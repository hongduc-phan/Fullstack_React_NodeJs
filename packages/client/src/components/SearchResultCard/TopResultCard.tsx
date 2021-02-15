import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImg from "assets/avatar.png";
import { TopIgnitesBar } from "components";
import React from "react";
import { ResultCardWrapper, Topbar } from "./components";

type TopResultCardProps = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  categoryTitle: {
    ...theme.typography.caption,
    display: "block",
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
  }
}));

const TopResultCard = () => {
  const classes = useStyles();

  return (
    <ResultCardWrapper>
      <Box>
        <Typography gutterBottom className={classes.categoryTitle}>
          Total
        </Typography>
        <Topbar sparksCount={100} ignitesCount={19} participantsCount={15} />
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(2, 1fr) 20px">
        <Box marginRight="8px">
          <Typography className={classes.categoryTitle}>Initiated</Typography>
          <Box display="grid" gridTemplateColumns="60px 20px 20px auto" gridGap="0 8px">
            <Typography variant="caption">Jan 2020</Typography>
            <Typography variant="caption">by</Typography>
            <Avatar src={AvatarImg} className={classes.avatarImg} />
            <Typography variant="caption" className={classes.authorText}>
              John Doe dlfjdlfjdlkjf
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography className={classes.categoryTitle}>Most active</Typography>
          <Box display="flex" flexDirection="row">
            {/* TODO: This should be rendered as a list of Avatar components for top Most active participants */}
            {/* TODO: Limit number of most active participants to 10 */}
            <Avatar src={AvatarImg} className={classes.avatarImg} />
          </Box>
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

export default TopResultCard;
