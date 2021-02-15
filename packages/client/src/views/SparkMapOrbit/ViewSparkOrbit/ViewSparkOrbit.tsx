import { GET_BEST_FIT_SPARKS, GET_SPARK } from "apollo/Queries";
import { SparkLoading } from "components/reusable";
import { SparkMapOrbit } from "components/SparkMapOrbit";
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { RouteParams } from "types";
import { useQuery } from "urql";
import { isValidUuid } from "utils";

const ViewSparkOrbit = () => {
  const { sparkId }: RouteParams = useParams();
  const isValidSparkId = isValidUuid(sparkId);

  const [sparkResult] = useQuery({
    query: GET_SPARK,
    variables: { id: sparkId },
    pause: !isValidSparkId
  });

  const [bestFitResult] = useQuery({
    query: GET_BEST_FIT_SPARKS,
    variables: { sparkId },
    pause: !isValidSparkId
  });

  if (!isValidUuid(sparkId)) return <Redirect to="/sparkmap" />;
  if (sparkResult.fetching || bestFitResult.fetching) return <SparkLoading />;
  if (sparkResult.error || bestFitResult.error) return <div>Error!</div>;
  else {
    console.log("Error in ViewSparkOrbit component");
    return <SparkMapOrbit sparks={[sparkResult.data.spark, ...bestFitResult.data.getBestFitSparks.sparks]} />;
  }
};

export default React.memo(ViewSparkOrbit);
