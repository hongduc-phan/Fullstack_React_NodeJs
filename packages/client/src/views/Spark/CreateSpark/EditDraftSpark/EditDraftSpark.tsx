import { Typography } from "@material-ui/core";
import { UPDATE_SPARK } from "apollo/Mutations";
import { GET_IGNITES, GET_SPARK } from "apollo/Queries";
import CenteredComponent from "components/CenteredComponent";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CreateSparkSparkOnFormState, IgniteGroup, RouteParams, Spark, SparkUpdateInput } from "types";
import { useMutation, useQuery } from "urql";
import CreateSparkPlain from "../components/CreateSparkPlain";

export type CreateSparkMutationVariables = Pick<Spark, "title" | "description" | "body" | "backgroundImage"> & {
  ignites: string[];
};

type EditDraftSparkProps = {
  spark: Spark;
  ignites: IgniteGroup[];
  handlePublishClick: (variables: CreateSparkMutationVariables) => void;
};

const EditDraftSpark = ({ spark, ignites, handlePublishClick }: EditDraftSparkProps) => {
  const { title, description, body, backgroundImage } = spark;
  const ignitesOnSpark = spark.ignites ?? [];

  const draftSparkFormValues: CreateSparkSparkOnFormState = {
    title: title ?? "",
    main: description ?? "",
    elaboration: body ?? ""
  };

  return (
    <CreateSparkPlain
      handlePublishClick={handlePublishClick}
      initialFormState={draftSparkFormValues}
      ignites={ignites}
      ignitesOnSpark={ignitesOnSpark}
      sparkBgImage={backgroundImage}
    />
  );
};

const EditDraftSparkController = () => {
  const { sparkId }: RouteParams = useParams();
  const history = useHistory();

  const [getSpark] = useQuery<{ spark: Spark }>({
    query: GET_SPARK,
    variables: { id: sparkId },
    pause: !sparkId
  });

  const [getIgnites] = useQuery<{ ignites: IgniteGroup[] }>({ query: GET_IGNITES });

  const { fetching, error, data } = getSpark;
  const { error: ignitesQueryErr, fetching: ignitesQueryLoading, data: ignitesQueryData } = getIgnites;

  const [, updateSpark] = useMutation<any, SparkUpdateInput>(UPDATE_SPARK);

  const handlePublishClick = (variables: CreateSparkMutationVariables) => {
    updateSpark({ ...variables, id: sparkId!, backgroundImage: variables.backgroundImage })
      .then((res) => {
        const sparkmapId = res.data.updateSpark!.sparkmap.id;
        history.push(`/sparkmap/${sparkmapId}`);
      })
      .catch((err) => {
        console.error("Error editing draft Spark", err);
      });
  };

  if (fetching || ignitesQueryLoading) return <h3>Loading...</h3>;
  if (error || ignitesQueryErr) return <h3>Error</h3>;

  if (!data?.spark) {
    return (
      <CenteredComponent>
        <Typography>Invalid spark. The spark may no longer exist.</Typography>
      </CenteredComponent>
    );
  }

  if (data && ignitesQueryData) {
    const ignites = ignitesQueryData.ignites;

    return <EditDraftSpark spark={data.spark} ignites={ignites} handlePublishClick={handlePublishClick} />;
  }
  return null;
};

export default React.memo(EditDraftSparkController);
