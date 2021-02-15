// TODO: Remove button and leftmenu after finishing Sparkmap workflow
import { makeStyles } from "@material-ui/core/styles";
import { AuthGuard, Loader } from "components";
import React, { Suspense } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { useRouteMatch } from "react-router-dom";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "types";
import { Header } from "./components";

type SparkmapLayoutProps = {
  route: RouteConfig;
};

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: `auto ${SIDEBAR_WIDTH}px`,
    gridTemplateRows: "72px auto",
    gap: "1px 1px",
    gridTemplateAreas: '"header header"\n    "mainContent sidebar"',
    height: "100vh"
  },

  sidebar: {
    top: HEADER_HEIGHT,
    gridArea: "sidebar",
    height: "100%",
    overflowY: "scroll",
    borderLeftColor: "rgba(0, 0, 0, 0.12)",
    borderLeftWidth: 1,
    borderLeftStyle: "solid"
  },
  mainContent: {
    gridArea: "mainContent",
    overflowY: "hidden"
  },
  header: { gridArea: "header" }
}));

const SparkmapLayout = ({ route }: SparkmapLayoutProps) => {
  const classes = useStyles();
  const isSearchRouteActive = useRouteMatch(`/sparkmap/search`);

  return (
    <AuthGuard>
      <div className={classes.container}>
        <header className={classes.header}>
          <Header isSearchRouteActive={Boolean(isSearchRouteActive)} />
        </header>
        <aside className={classes.sidebar}>
          <Suspense fallback={<Loader variant="drawer" />}>{renderRoutes(route.routes)}</Suspense>
        </aside>
        <main className={classes.mainContent}>
          <Suspense fallback={<Loader variant="drawer" />}>{renderRoutes(route.orbitRoutes)}</Suspense>
        </main>
      </div>
    </AuthGuard>
  );
};

export default React.memo(SparkmapLayout);
