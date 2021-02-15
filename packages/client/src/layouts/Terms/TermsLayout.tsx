import { Box, CircularProgress, Container, Paper, Tab, Tabs, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "assets/icons";
import React, { Suspense } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { useHistory, useLocation } from "react-router-dom";

type Props = {
  activeTabIndex?: number;
  route: RouteConfig;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh"
  },
  header: {
    height: 60,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 3)
  },
  tabsRoot: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  contentContainer: {
    height: "calc(100vh - 109px)",
    padding: theme.spacing(5)
  }
}));

type TermsRouteNames = "terms-of-service" | "privacy-policy" | "code-of-conduct" | "cookies-policy";

const TermsLayout = ({ activeTabIndex = 1, route }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleTabClick = (routeName: TermsRouteNames) => {
    if (routeName === "terms-of-service") {
      history.push(`/terms`);
      return;
    }

    history.push(`/terms/${routeName}`);
  };

  return (
    <Box className={classes.root}>
      <Paper elevation={0} square>
        <Box className={classes.header}>
          <Logo />
        </Box>
        <Tabs
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          className={classes.tabsRoot}
        >
          <Tab
            label="Privacy policy"
            value="/terms/privacy-policy"
            onClick={() => handleTabClick("privacy-policy")}
            onMouseOver={() => import("components/TermsComponents/PrivacyPolicy")}
          />
          <Tab
            label="Terms of Service"
            value="/terms"
            onClick={() => handleTabClick("terms-of-service")}
            onMouseOver={() => import("components/TermsComponents/Terms")}
          />
          <Tab
            label="Code of conduct"
            value="/terms/code-of-conduct"
            onClick={() => handleTabClick("code-of-conduct")}
            onMouseOver={() => import("components/TermsComponents/CodeofConduct")}
          />
          <Tab
            label="Cookies policy"
            value="/terms/cookies-policy"
            onClick={() => handleTabClick("cookies-policy")}
            onMouseOver={() => import("components/TermsComponents/CookiesPolicy")}
          />
        </Tabs>
      </Paper>

      <Container maxWidth="md" className={classes.contentContainer}>
        <Suspense
          fallback={
            <Paper>
              <CircularProgress />
            </Paper>
          }
        >
          {renderRoutes(route.routes)}
        </Suspense>
      </Container>
    </Box>
  );
};

export default TermsLayout;
