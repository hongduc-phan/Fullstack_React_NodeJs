import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Container,
  Drawer,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close as CloseIcon, MoreVert as MoreIcon } from "@material-ui/icons";
import { GET_PRIVATE_PROFILE } from "apollo/Queries";
import DemoCoverImage from "assets/cover-image.jpg";
import { Loader } from "components";
import { IgniteChip } from "components/reusable";
import { useAuthStore } from "contexts/AuthContext";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ActivityTabsType, HEADER_HEIGHT, MemberPrivateProfile, PrivateProfileTabNames, SIDEBAR_WIDTH } from "types";
import { useQuery } from "urql";
import { Activity } from "views/Profile/components";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    padding: 0
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH - 1,
    top: HEADER_HEIGHT
  },
  dialogTitle: {
    flex: 1,
    marginLeft: theme.spacing(2)
  },
  drawerContent: {
    height: "100%",
    padding: 0
  },
  appBar: {
    top: 0,
    height: 56
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avatarContainer: {
    // position: "relative",
    padding: theme.spacing(0, 2.75)
  },
  avatarImage: {
    // * We could add background color to have consistency in avatar image bg
    backgroundColor: "#fff",
    marginTop: theme.spacing(-13.25),
    height: 120,
    width: 120,
    border: "4px solid #fff",
    borderRadius: "50%"
  },
  fullnameText: {
    marginTop: theme.spacing(1)
  },
  bioText: {
    marginTop: theme.spacing(1.75)
  },
  tabRoot: {
    marginTop: theme.spacing(3),
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  newAvatarSelection: {
    position: "absolute",
    color: "white",
    top: "48%",
    left: "6%",
    cursor: "pointer"
  },
  coverImage: {
    height: 164
  },
  tabcontentContainer: {},
  chipContainer: {
    marginTop: theme.spacing(1.5),
    width: 550
  },
  aboutTextBlockContainer: {
    marginTop: theme.spacing(3),
    "&:first-child": {
      marginTop: 0
    }
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

type PrivateProfileHomeProps = {
  privateProfileData: Partial<MemberPrivateProfile>;
};

const PrivateProfileHome = ({ privateProfileData }: PrivateProfileHomeProps) => {
  const {
    firstname,
    lastname,
    membername,
    aboutme,
    languages,
    places,
    website,
    coverImageUrl,
    profilePictureUrl,
    background,
    interests,
    knowtypes
  } = privateProfileData;

  const classes = useStyles();
  const { logout } = useAuthStore();
  const [value, setValue] = useState(0);

  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTabsType>("Sparks created");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (activityTab: ActivityTabsType) => {
    setActiveActivityTab(activityTab);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // State Update methods
  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleClose();
    logout();
  };

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <AppBar color="inherit" position="sticky" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <RouterLink to="/sparkmap">
            <IconButton edge="start" aria-label="Close form">
              <CloseIcon />
            </IconButton>
          </RouterLink>
          <Typography variant="h6" className={classes.dialogTitle}>
            {firstname ? firstname : "Firstname"} {lastname ? lastname : "Lastname"}
          </Typography>
          <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleMenuIconClick}>
            <MoreIcon />
          </IconButton>
          <Menu id="profile-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <RouterLink to={`/profile/editprofile`} style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
            </RouterLink>
            <RouterLink to={`/profile/settings`} style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
            </RouterLink>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box>
        <CardMedia image={coverImageUrl ? coverImageUrl : DemoCoverImage} className={classes.coverImage} />
        <Container className={classes.drawerContent}>
          <Box className={classes.avatarContainer}>
            <CardMedia image={profilePictureUrl!} className={classes.avatarImage} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" className={classes.fullnameText}>
                {firstname || "Firstname"} {lastname || "Lastname"}
              </Typography>
              <RouterLink to={`/profile/editprofile`} style={{ textDecoration: "none", color: "inhreit" }}>
                <Button color="primary" variant="outlined">
                  Edit Profile
                </Button>
              </RouterLink>
            </Box>
            <Typography variant="body2" color="textSecondary">
              @{membername}
            </Typography>
            <Typography variant="body2" className={classes.bioText}>
              {aboutme}
            </Typography>
          </Box>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            textColor="primary"
            indicatorColor="primary"
            className={classes.tabRoot}
          >
            <LinkTab label="About" {...a11yProps(0)} />
            <LinkTab label="Activity" {...a11yProps(1)} />
            <LinkTab label="Insights" {...a11yProps(2)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Box className={classes.tabcontentContainer}>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">My background</Typography>
                {background?.map((item) => (
                  <IgniteChip key={item} capitalizeLabel chipLabel={item} />
                ))}
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">My interests</Typography>
                {interests?.map((item) => (
                  <IgniteChip key={item} capitalizeLabel chipLabel={item} />
                ))}
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">My knowtypes</Typography>
                {knowtypes?.map((item) => (
                  <IgniteChip key={item} capitalizeLabel chipLabel={item} />
                ))}
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography gutterBottom variant="subtitle1">
                  Languages
                </Typography>
                <Typography variant="body2">{languages?.join(", ")}</Typography>
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography gutterBottom variant="subtitle1">
                  Places I’ve lived in
                </Typography>
                <Typography variant="body2">{places?.join(", ")}</Typography>
              </Box>

              <Box className={classes.aboutTextBlockContainer}>
                <Typography gutterBottom variant="subtitle1">
                  Websites
                </Typography>
                <Link color="secondary">{website}</Link>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={classes.tabcontentContainer}>
              <Typography variant="subtitle1">Filter by type</Typography>
              <Box className={classes.chipContainer}>
                {PrivateProfileTabNames.map((item) => (
                  <IgniteChip
                    clickable
                    capitalizeLabel
                    chipLabel={item}
                    isSelected={activeActivityTab === item}
                    onClick={() => handleClick(item)}
                  />
                ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box className={classes.tabcontentContainer}>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">Insights Tab</Typography>
              </Box>
            </Box>
          </TabPanel>
          {value === 1 && <Activity activeActivityTab={activeActivityTab} userFullName={undefined} />}
        </Container>
      </Box>
    </Drawer>
  );
};

const PrivateProfileHomeController = () => {
  const [{ fetching, data }] = useQuery({ query: GET_PRIVATE_PROFILE });

  if (fetching) return <Loader variant="drawer" />;

  if (data) return <PrivateProfileHome privateProfileData={data.privateProfile} />;

  return null;
};

export default React.memo(PrivateProfileHomeController);
