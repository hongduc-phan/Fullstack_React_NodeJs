import { Box, Button, CircularProgress, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Footer, SidebarCarousel } from "components";
import { useAuthStore } from "contexts";
import React, { Suspense } from "react";
import { matchRoutes, renderRoutes, RouteConfig } from "react-router-config";
import { Link as RouterLink, Redirect, useRouteMatch } from "react-router-dom";

type RegistrationLayoutProps = {
  route: RouteConfig;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 0.7fr 1.7fr max-content",
    gridTemplateRows: "0.3fr 2.5fr 0.2fr",
    gap: "1px 1px",
    gridTemplateAreas:
      '"leftSidebar spacer topSpacer rightSidebar" "leftSidebar spacer content rightSidebar" "leftSidebar footer footer footer"'
  },
  leftSidebar: { gridArea: "leftSidebar", borderRight: "1px solid rgba(0, 0, 0, 0.12)", maxWidth: 420 },
  footer: { gridArea: "footer", display: "flex", alignItems: "center" },
  spacer: { gridArea: "spacer" },
  rightSidebar: { gridArea: "rightSidebar", padding: theme.spacing(1) },
  topSpacer: { gridArea: "topSpacer" },
  content: { gridArea: "content" },

  linkButton: {
    fontSize: 14,
    letterSpacing: 0.75,
    textTransform: "uppercase"
  }
}));

const RegistrationLayout = ({ route }: RegistrationLayoutProps) => {
  const classes = useStyles();

  const { isAuthenticated, isFirstLogin } = useAuthStore();

  const isLoginPage = useRouteMatch("/auth/login");
  const isRegistrationPage = useRouteMatch("/registration/1");

  // TODO: Replace this hacky way to determine welcome page with soemthing elegant
  const isWelcomePage = matchRoutes(route.routes!, "/").length !== 0;

  if (isAuthenticated && isFirstLogin) {
    return <Redirect to="/profile-setup" />;
  }

  if (isAuthenticated && !isFirstLogin) {
    return <Redirect to="/sparkmap" />;
  }

  return (
    <main className={classes.container}>
      <Box className={classes.leftSidebar}>
        <SidebarCarousel />
      </Box>
      <Box className={classes.spacer} />
      <Box className={classes.topSpacer} />

      <Box className={classes.content}>
        <Suspense fallback={<CircularProgress />}>{renderRoutes(route.routes)}</Suspense>
      </Box>
      <Box className={classes.footer}>
        <Footer />
      </Box>

      <Box className={classes.rightSidebar}>
        {(Boolean(isLoginPage) || isWelcomePage) && (
          <>
            <Typography variant="caption" display="inline">
              New to Hunome?
            </Typography>
            <Button color="secondary" component={RouterLink} to="/registration" className={classes.linkButton}>
              Get Started
            </Button>
          </>
        )}

        {Boolean(isRegistrationPage) && (
          <>
            <Typography variant="caption" display="inline">
              Already a member?
            </Typography>
            <Button color="secondary" component={RouterLink} to="/auth/login" className={classes.linkButton}>
              Log In
            </Button>
          </>
        )}
      </Box>
    </main>
  );
};

export default React.memo(RegistrationLayout);
