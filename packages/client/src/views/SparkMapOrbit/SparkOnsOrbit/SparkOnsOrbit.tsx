import { GET_SPARKONS_LIST } from "apollo/Queries";
import { EmptySparkMap, SparkLoading } from "components/reusable";
import { SparkMapOrbit } from "components/SparkMapOrbit";
import { useActiveOrbitUpdateDispatch } from "contexts";
import React from "react";
import { useParams } from "react-router-dom";
import { RouteParams } from "types";
import { useQuery } from "urql";

const SparkOnsOrbit = () => {
  const { sparkId }: RouteParams = useParams();
  const dispatch = useActiveOrbitUpdateDispatch();
  const [{ data, fetching, error }] = useQuery({
    query: GET_SPARKONS_LIST,
    variables: { sparkId }
  });

  if (fetching) return <SparkLoading />;
  if (error) return <div>Error! {error.message}</div>;
  if (!sparkId) return <EmptySparkMap />;

  // Persist sparkons list in activeOrbit store
  dispatch({ type: "update_orbit_store", payload: [data.spark, ...data.spark.children] });

  return <SparkMapOrbit sparks={[data.spark, ...data.spark.children]} />;
};

export default React.memo(SparkOnsOrbit);
