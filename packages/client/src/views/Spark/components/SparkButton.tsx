import { Fab } from "@material-ui/core";
import { SparkIcon } from "assets/icons";
import React from "react";
import { Link } from "react-router-dom";

type SparkButtonProps = {
  sparkmapId: string;
};

const SparkButton = ({ sparkmapId }: SparkButtonProps) => {
  return (
    <Link to={`/spark/${sparkmapId}/newspark`}>
      <Fab color="primary" aria-label="Create new Spark">
        <SparkIcon viewBox="0 0 20 20" />
      </Fab>
    </Link>
  );
};

export default React.memo(SparkButton);
