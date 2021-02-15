import { IconButton, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { GET_SPARKONS_LIST } from "apollo/Queries";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { RouteParams, Spark } from "types";
import { useQuery } from "urql";
import { SparkOnItem } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: theme.spacing(2)
  },
  header: {
    fontSize: 20,
    letterSpacing: 0.15,
    flex: 1,
    marginLeft: theme.spacing(2)
  }
}));

const SparkOnsList = () => {
  const { sparkId }: RouteParams = useParams();
  const classes = useStyles();
  const history = useHistory();

  const handleBackIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    history.goBack();
  };

  const handleSparkClick = (spark: Spark) => {
    history.push(`/sparkmap/sparkonslist/${spark.id}`);
  };

  const [{ data, fetching, error }] = useQuery({
    query: GET_SPARKONS_LIST,
    variables: { sparkId }
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <IconButton edge="start" aria-label="Close form" onClick={handleBackIconClick}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" className={classes.header}>
          SparkOns ({data.spark.children.length})
        </Typography>
      </div>
      {data.spark.children.map((s: Spark) => (
        <SparkOnItem key={s.id} spark={s} onClick={handleSparkClick} />
      ))}
    </React.Fragment>
  );
};

export default React.memo(SparkOnsList);
