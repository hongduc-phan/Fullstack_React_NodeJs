import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IgniteIcon, SparkIcon } from "assets/icons";
import ListAvatar from "assets/listAvatar.png";
import React from "react";
import { ActivityTabsType } from "types";
import Draft from "./Draft";

const useStyles = makeStyles((theme: Theme) => ({
  headerText: {
    display: "block",
    padding: theme.spacing(0, 0, 1.25, 3)
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  listItem: {
    padding: theme.spacing(1.25, 2)
  },
  avatarItem: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    height: 64,
    width: 64
  },
  activityChip: {
    marginRight: theme.spacing(1.5)
  }
}));

type Props = {
  activeActivityTab: ActivityTabsType;
  ignites?: number;
  sparkons?: number;
  time?: string;
  userFullName?: string;
};

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const Activity = ({ userFullName = "Firstname", activeActivityTab }: Props) => {
  const classes = useStyles();

  return (
    <>
      {activeActivityTab === "Sparks created" && (
        <Box>
          <Typography variant="overline" className={classes.headerText}>
            3 sparks created
          </Typography>
          <Divider variant="fullWidth" />
          <Grid item xs={12} md={12}>
            <List>
              {generate(
                <>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatarItem}>
                      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Risks of becoming a pure freelancer"
                      primaryTypographyProps={{
                        variant: "subtitle1"
                      }}
                      secondary={
                        <Typography component="span" variant="body2" color="textSecondary" style={{ display: "flex" }}>
                          <SparkIcon style={{ fontSize: "1.125rem", margin: "auto 4px 0px 0px" }} /> 11
                          <IgniteIcon style={{ fontSize: "1.5rem", margin: "auto -6px -6px 9px" }} />
                          38 · 25 mins ago
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </>
              )}
            </List>
          </Grid>
        </Box>
      )}
      {activeActivityTab === "Sparkons received" && (
        <Box>
          <Typography variant="overline" className={classes.headerText}>
            3 sparkons received
          </Typography>
          <Divider variant="fullWidth" />
          <Grid item xs={12} md={12}>
            <List>
              {generate(
                <>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatarItem}>
                      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Benefits of doing freelance work"
                      primaryTypographyProps={{
                        variant: "subtitle1"
                      }}
                      secondary={
                        <Typography component="span" variant="body2" color="textSecondary" style={{ display: "flex" }}>
                          <SparkIcon style={{ fontSize: "1.125rem", margin: "auto 4px 0px 0px" }} /> 11
                          <IgniteIcon style={{ fontSize: "1.5rem", margin: "auto -6px -6px 9px" }} />
                          38 · {userFullName} · 25 mins ago
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </>
              )}
            </List>
          </Grid>
        </Box>
      )}
      {activeActivityTab === "Ignites received" && (
        <Box>
          <Typography variant="overline" className={classes.headerText}>
            3 ignites received
          </Typography>
          <Divider variant="fullWidth" />
          <Grid item xs={12} md={12}>
            <List>
              {generate(
                <>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatarItem}>
                      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Benefits of doing freelance work"
                      primaryTypographyProps={{
                        variant: "subtitle1"
                      }}
                      secondary={
                        <Typography component="span" variant="body2" color="textSecondary" style={{ display: "flex" }}>
                          <SparkIcon style={{ fontSize: "1.125rem", margin: "auto 4px 0px 0px" }} /> 11
                          <IgniteIcon style={{ fontSize: "1.5rem", margin: "auto -6px -6px 9px" }} />
                          38 · {userFullName} · 25 mins ago
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Box style={{ marginLeft: 96, marginBottom: 18, marginTop: -6 }}>
                    <Chip label="Anthropology" className={classes.activityChip} />
                  </Box>

                  <Divider variant="fullWidth" component="li" />
                </>
              )}
            </List>
          </Grid>
        </Box>
      )}
      {activeActivityTab === "Sparkons donated" && (
        <Box>
          <Typography variant="overline" className={classes.headerText}>
            56 sparkons donated
          </Typography>
          <Divider variant="fullWidth" />
          <Grid item xs={12} md={12}>
            <List>
              {generate(
                <>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatarItem}>
                      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Freelance work could soon be the new normal"
                      primaryTypographyProps={{
                        variant: "subtitle1"
                      }}
                      secondary={
                        <Typography component="span" variant="body2" color="textSecondary" style={{ display: "flex" }}>
                          <SparkIcon style={{ fontSize: "1.125rem", margin: "auto 4px 0px 0px" }} /> 11
                          <IgniteIcon style={{ fontSize: "1.5rem", margin: "auto -6px -6px 9px" }} />
                          38 · 25 mins ago
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </>
              )}
            </List>
          </Grid>
        </Box>
      )}
      {activeActivityTab === "Ignites donated" && (
        <Box>
          <Typography variant="overline" className={classes.headerText}>
            56 Ignites donated
          </Typography>
          <Divider variant="fullWidth" />
          <Grid item xs={12} md={12}>
            <List>
              {generate(
                <>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatarItem}>
                      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Benefits of doing freelance work"
                      primaryTypographyProps={{
                        variant: "subtitle1"
                      }}
                      secondary={
                        <Typography component="span" variant="body2" color="textSecondary" style={{ display: "flex" }}>
                          <SparkIcon style={{ fontSize: "1.125rem", margin: "auto 4px 0px 0px" }} /> 11
                          <IgniteIcon style={{ fontSize: "1.5rem", margin: "auto -6px -6px 9px" }} />
                          38 · 3 mins ago
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Box style={{ marginLeft: 96, marginBottom: 18, marginTop: -6 }}>
                    <Chip label="Aesthetic" className={classes.activityChip} />
                    <Chip label="Anecdotal" className={classes.activityChip} />
                    <Chip label="Belief" className={classes.activityChip} />
                  </Box>

                  <Divider variant="fullWidth" component="li" />
                </>
              )}
            </List>
          </Grid>
        </Box>
      )}
      {activeActivityTab === "Interacting" && (
        <Box>
          <Typography variant="overline" className={classes.headerText}>
            The text content is missing
          </Typography>
          <Divider variant="fullWidth" />
          <Grid item xs={12} md={12}>
            <List>
              {generate(
                <>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar className={classes.avatarItem}>
                      <Avatar alt="something" src={ListAvatar} className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="John Doe"
                      primaryTypographyProps={{
                        variant: "subtitle1"
                      }}
                      secondary="@JDoe"
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </>
              )}
            </List>
          </Grid>
        </Box>
      )}
      {activeActivityTab === "Drafts" && <Draft />}
    </>
  );
};

Activity.defaultProps = {
  ignites: 10,
  sparkons: 25,
  time: "10 mins ago"
};

export default React.memo(Activity);
