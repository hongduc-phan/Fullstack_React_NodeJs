import { CircularProgress, Paper } from "@material-ui/core";
import React, { ReactChild, Suspense } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";

type SparkFormLayoutProps = {
  route: RouteConfig;
  chidren: ReactChild;
};

const SparkFormLayout = ({ route }: SparkFormLayoutProps) => {
  return (
    <Suspense
      fallback={
        <Paper>
          <CircularProgress />
        </Paper>
      }
    >
      {renderRoutes(route.routes)}
    </Suspense>
  );
};

export default SparkFormLayout;
