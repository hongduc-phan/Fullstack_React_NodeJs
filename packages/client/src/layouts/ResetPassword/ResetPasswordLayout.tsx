import { Box, CircularProgress, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "assets/icons";
import React, { Suspense } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { Footer } from "../../components";

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

const ResetPasswordLayout = ({ route }: RouteConfig) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={2} square className={classes.header}>
        <Logo />
      </Paper>
      <Box className={classes.content}>
        <Suspense fallback={<CircularProgress />}>{renderRoutes(route.routes)}</Suspense>
      </Box>
      <Footer className={classes.footer} />
    </div>
  );
};

export default ResetPasswordLayout;
