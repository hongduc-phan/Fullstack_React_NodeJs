import { Box, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "types";
import CenteredComponent from "./CenteredComponent";

type LoaderProps = {
  className?: string;
  variant?: "drawer" | "inline";
};

const Loader = ({ variant = "inline", className }: LoaderProps) => {
  return (
    <React.Fragment>
      {variant === "drawer" && (
        <Box className={clsx(className)} height={`calc(100vh - ${HEADER_HEIGHT + 2}px)`}>
          <Box
            width={`${SIDEBAR_WIDTH}px`}
            height="100%"
            border="1px solid rgba(0, 0, 0, 0.12)"
            boxShadow="0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
          >
            <CenteredComponent>
              <CircularProgress size={50} color="secondary" />
            </CenteredComponent>
          </Box>
        </Box>
      )}

      {variant === "inline" && (
        <CenteredComponent>
          <CircularProgress size={50} color="secondary" />
        </CenteredComponent>
      )}
    </React.Fragment>
  );
};

export default Loader;
