import {
  AppBar,
  Box,
  CardMedia,
  Chip as MuiChip,
  Container,
  Drawer,
  IconButton,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close as CloseIcon, MoreVert as MoreIcon } from "@material-ui/icons";
import { GET_PUBLIC_PUBLIC } from "apollo/Queries";
import CoverImg from "assets/cover.png";
import { IgniteChip } from "components/reusable";
import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ActivityTabsType, HEADER_HEIGHT, MemberPublicProfile, PublicProfileTabNames, SIDEBAR_WIDTH } from "types";
import { useQuery } from "urql";
import { Activity } from "../components";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    padding: 0
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
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
    borderRadius: "50%",
    width: 120
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
    height: 220
  },
  tabcontentContainer: {},
  chipContainer: {
    marginTop: theme.spacing(2.5),
    width: 500
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

type PublicProfileProps = {
  bioText?: string | undefined;
  fullName?: string | undefined;
  username?: string | undefined;
  publicProfileData: MemberPublicProfile;
};

const PublicProfile = ({ bioText, fullName, username, publicProfileData }: PublicProfileProps) => {
  const { membername, profilePictureUrl, coverImageUrl, aboutme } = publicProfileData;
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const [activeActivityTab, setActiveActivityTab] = React.useState<ActivityTabsType>("Sparkons received");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = useCallback((activityTab: ActivityTabsType) => {
    setActiveActivityTab(activityTab);
  }, []);

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
            <CloseIcon />
          </RouterLink>
          <Typography variant="h6" className={classes.dialogTitle}>
            {fullName}
          </Typography>
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box>
        <CardMedia image={coverImageUrl ? coverImageUrl : CoverImg} className={classes.coverImage}></CardMedia>
        <Container className={classes.drawerContent}>
          <Box className={classes.avatarContainer}>
            <CardMedia image={profilePictureUrl!} className={classes.avatarImage} />
            <Typography variant="h6" className={classes.fullnameText}>
              {fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {membername}
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
          </Tabs>

          <TabPanel value={value} index={0}>
            <Box className={classes.tabcontentContainer}>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">My background</Typography>
                <Box className={classes.chipContainer}>
                  <MuiChip label="Anthropology" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Art" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Biology" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Culture" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Curiosity" style={{ margin: "0 12px 12px 0" }} />
                </Box>
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">My interests</Typography>
                <Box className={classes.chipContainer}>
                  <MuiChip label="Behaviour" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Beliefs" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Community" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Cultures" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Critical thinking" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Differences" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Emotions" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Expression" style={{ margin: "0 12px 12px 0" }} />
                </Box>
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography variant="subtitle1">My knowtypes</Typography>
                <Box className={classes.chipContainer}>
                  <MuiChip label="Aesthetic" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Anecdotal" style={{ margin: "0 12px 12px 0" }} />
                  <MuiChip label="Belief" style={{ margin: "0 12px 12px 0" }} />
                </Box>
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography gutterBottom variant="subtitle1">
                  Languages
                </Typography>
                <Typography variant="body2">English, Russian, Finnish, Polish</Typography>
              </Box>
              <Box className={classes.aboutTextBlockContainer}>
                <Typography gutterBottom variant="subtitle1">
                  Places I’ve lived in
                </Typography>
                <Typography variant="body2">Sevastopol, New-Delhi, Valkeakoski, Tampere, Espoo</Typography>
              </Box>

              <Box className={classes.aboutTextBlockContainer}>
                <Typography gutterBottom variant="subtitle1">
                  Websites
                </Typography>
                <Link color="secondary">https://theperson.com/blog</Link>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Box className={classes.tabcontentContainer}>
              <Typography variant="subtitle1">Filter by type</Typography>
              <Box className={classes.chipContainer}>
                {PublicProfileTabNames.map((item) => (
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
          {value === 1 && <Activity activeActivityTab={activeActivityTab} />}
        </Container>
      </Box>
    </Drawer>
  );
};

const PublicProfileController = () => {
  // TODO: use dynamic memberId from path

  const [result, reexecuteQuery] = useQuery({
    query: GET_PUBLIC_PUBLIC,
    variables: { memberId: "1f825df9-5aed-490f-9195-968f8386cdae" }
  });

  const { fetching: loading, error, data } = result;

  // const { loading, error, data } = useQuery(GET_PUBLIC_PUBLIC, {
  //   // TODO: use dynamic memberId from path
  //   variables: { memberId: "1f825df9-5aed-490f-9195-968f8386cdae" }
  // });

  const classes = useStyles();

  if (loading)
    return (
      <Container className={classes.drawerContent}>
        <div>Loading....</div>
      </Container>
    );

  if (data) return <PublicProfile publicProfileData={data.publicProfile} />;

  return null;
};

PublicProfile.defaultProps = {
  bioText: "“Everything that is done in the world is done by hope.” – ML",
  fullName: "Firstname LastName",
  username: "@theperson"
};

export default React.memo(PublicProfileController);
