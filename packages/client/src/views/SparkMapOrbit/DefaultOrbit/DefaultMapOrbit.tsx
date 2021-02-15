import { GET_BEST_FIT_FOR_PROFILE } from "apollo/Queries";
import { SparkLoading } from "components/reusable";
import { SparkMapOrbit } from "components/SparkMapOrbit";
import { useActiveOrbitStore } from "contexts";
import React from "react";
import { useLocation } from "react-router-dom";
import { Spark } from "types";
import { useQuery } from "urql";

function useRouteQuery() {
  return new URLSearchParams(useLocation().search);
}

const DefaultMapOrbit = () => {
  const { sparks: sparksFromOrbitStore } = useActiveOrbitStore();
  const query = useRouteQuery();

  console.log(query.get("name"));

  const [result] = useQuery({
    query: GET_BEST_FIT_FOR_PROFILE
  });

  const { fetching, error, data } = result;

  if (fetching) return <SparkLoading />;
  if (error) return <div>Error! {error.message}</div>;
  if (data?.getBestFitForProfile.sparks) {
    let sparks: Spark[];

    // Check if we have sparks in the active orbit store before rendering orbit with sparks best fitting member's profile
    if (sparksFromOrbitStore.length) {
      sparks = sparksFromOrbitStore;
    } else {
      sparks = data.getBestFitForProfile.sparks;
    }

    return <SparkMapOrbit sparks={sparks} />;
  }

  return null;
};

export default React.memo(DefaultMapOrbit);
