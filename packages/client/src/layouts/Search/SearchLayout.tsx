// TODO: Remove button and leftmenu after finishing Sparkmap workflow
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthGuard, Loader } from "components";
import { OrbitComponent } from "components/SparkMapOrbit";
import { useActiveOrbitStore } from "contexts";
import React, { Suspense } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "types";
import { Header } from "./components";

type SearchLayoutProps = {
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
    overflowY: "hidden",
    marginTop: 60
  },
  orbitContainer: {
    display: "grid",
    width: 650,
    maxWidth: 650,
    margin: "auto",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(6, 1fr)",
    gridArea: "orbit",
    gap: "40px 20px",
    gridTemplateAreas:
      '". top ."\n    "topLeft top topRight"\n    "topLeft center topRight"\n    "bottomLeft center bottomRight"\n    "bottomLeft bottom bottomRight"\n    ". bottom ."'
  },

  header: { gridArea: "header" }
}));

const SearchLayout = ({ route }: SearchLayoutProps) => {
  const classes = useStyles();
  const { sparks } = useActiveOrbitStore();

  return (
    <AuthGuard>
      <div className={classes.container}>
        <header className={classes.header}>
          <Header />
        </header>
        <aside className={classes.sidebar}>
          <Suspense fallback={<Loader variant="drawer" />}>{renderRoutes(route.routes)}</Suspense>
        </aside>
        <main className={classes.mainContent}>
          <Box className={classes.orbitContainer}>
            <OrbitComponent sparks={sparks} />
          </Box>
        </main>
      </div>
    </AuthGuard>
  );
};

export default SearchLayout;
