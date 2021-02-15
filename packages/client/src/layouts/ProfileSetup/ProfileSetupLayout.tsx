// TODO: improve component styling used to indicate loading and error states
import { Box, CircularProgress, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GET_PRIVATE_PROFILE } from "apollo/Queries";
import { Logo } from "assets/icons";
import { ProfileSetupProvider, useAuthStore } from "contexts";
import type { ProfileSetupContextState } from "contexts/ProfileSetupContext";
import { pick } from "ramda";
import React, { Suspense } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { Redirect } from "react-router-dom";
import { MemberPrivateProfile } from "types";
import { useQuery } from "urql";
import { AuthGuard, Footer } from "../../components";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "72px auto 40px",
    gap: "1px 1px",
    gridTemplateAreas: '"header" "content" "footer"'
  },
  header: {
    gridArea: "header",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 3)
  },
  content: {
    gridArea: "content"
  },
  footer: {
    gridArea: "footer"
  }
}));

const ProfileSetupLayout = ({ route }: RouteConfig) => {
  const classes = useStyles();

  const { isFirstLogin, isAuthenticated } = useAuthStore();

  const [{ error, fetching, data }] = useQuery<{ privateProfile: MemberPrivateProfile }>({
    query: GET_PRIVATE_PROFILE
  });

  if (!isFirstLogin) {
    return <Redirect to="/sparkmap" />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/auth/login" />;
  }

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching member setup data</div>;
  }

  if (data) {
    const profileSetupData = pick(
      [
        "background",
        "interests",
        "knowtypes",
        "profilePictureUrl",
        "firstname",
        "lastname",
        "birthdate",
        "aboutme",
        "languages",
        "places",
        "website",
        "coverImageUrl"
      ],
      data.privateProfile
      // Type casting is not very optimal, let's try to improve the typing bit later
    ) as ProfileSetupContextState;

    return (
      <AuthGuard restrictFirstLogin={false}>
        <div className={classes.root}>
          <Paper elevation={2} square className={classes.header}>
            <Logo />
          </Paper>
          <Box className={classes.content}>
            <ProfileSetupProvider initialState={profileSetupData}>
              <Suspense fallback={<CircularProgress />}>{renderRoutes(route.routes)}</Suspense>
            </ProfileSetupProvider>
          </Box>
          <Footer className={classes.footer} />
        </div>
      </AuthGuard>
    );
  }
  return null;
};

export default ProfileSetupLayout;
