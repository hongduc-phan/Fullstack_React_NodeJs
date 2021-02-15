// TODO: add snackbar notification for successful/error actions
import { CREATE_SPARK } from "apollo/Mutations";
import { GET_IGNITES } from "apollo/Queries";
import React from "react";
import { useHistory } from "react-router-dom";
import { IgniteGroup, Spark } from "types";
import { useMutation, useQuery } from "urql";
import CreateSparkPlain from "../components/CreateSparkPlain";

type MutationVariables = Pick<Spark, "title" | "description" | "body" | "backgroundImage"> & { ignites: string[] };

export const defaultSparkFormState = {
  title: "",
  main: "",
  elaboration: ""
};

export const defaultSparkFormMetaState = {
  title: false,
  main: false,
  elaboration: false
};

const CreateNewSpark = () => {
  const history = useHistory();

  // GraphQL mutation to create new spark
  const [, createSpark] = useMutation(CREATE_SPARK);
  const [{ fetching, error, data }] = useQuery<{ ignites: IgniteGroup[] }>({ query: GET_IGNITES });

  const handlePublishClick = (variables: MutationVariables) => {
    createSpark(variables)
      .then((response) => {
        const { id: sparkId } = response.data.createSpark;

        history.push(`/sparkmap/view-spark/${sparkId}`);
      })
      .catch((err) => {
        console.error("Error creating New Spark", err);
      });
  };

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  if (data) {
    const ignites = data.ignites;

    return (
      <CreateSparkPlain
        handlePublishClick={handlePublishClick}
        initialFormState={defaultSparkFormState}
        ignites={ignites}
      />
    );
  }

  return null;
};

export default React.memo(CreateNewSpark);
