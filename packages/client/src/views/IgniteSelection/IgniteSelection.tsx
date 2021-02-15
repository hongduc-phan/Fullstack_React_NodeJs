import { Box, Button, CircularProgress, Divider, Drawer, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import { ASSIGN_IGNITES } from "apollo/Mutations";
import { GET_SPARK } from "apollo/Queries";
import { GET_IGNITES } from "apollo/Queries/Ignites";
import clsx from "clsx";
import { CenteredComponent } from "components";
import { useAuthStore } from "contexts";
import { pluck } from "ramda";
import React, { useCallback, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  AssignIgnitesInput,
  HEADER_HEIGHT,
  IgniteGroup,
  JudgementIgniteCategories,
  RouteParams,
  SIDEBAR_WIDTH,
  Spark,
  SparkIgnite
} from "types";
import { useMutation, useQuery } from "urql";
import { getAllIgniteIds, getIgniteIdsByCategory } from "utils";
import { IgniteChipsContainer, IgniteListSection, IgniteSearchSection } from "./components";

type IgniteSelectionPlainProps = {
  className?: string;
  spark: Pick<Spark, "title" | "ignites">;
  ignites: IgniteGroup[];
  filterJudgementIgnites?: boolean;
  onBackClick?: () => void;
  onPublishClick: (selectedChips: string[]) => void;
};

const DialogContentWidth = 550;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    height: "100%",
    padding: 0
  },
  drawerPaper: {
    top: HEADER_HEIGHT,
    width: SIDEBAR_WIDTH
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2)
  },
  dialogTitle: {
    flex: 1,
    marginLeft: theme.spacing(2)
  },
  mostFrequent: {
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(1)
  },
  mostFrequentTextDivider: {
    marginTop: theme.spacing(1)
  },
  loadingDrawer: {
    height: "100%",
    width: DialogContentWidth
  }
}));

const getIgnites = (filterJudgementIgnites: boolean, ignites: IgniteGroup[]) => {
  if (filterJudgementIgnites) {
    const filteredIgniteGroups = ignites.filter((item) => !JudgementIgniteCategories.includes(item.id));

    const nonJudgementIds = getAllIgniteIds(filteredIgniteGroups);
    const nonJudgementIdsByCategory = getIgniteIdsByCategory(filteredIgniteGroups);

    return { allIgniteIds: nonJudgementIds, igniteIdsByCategory: nonJudgementIdsByCategory };
  } else {
    const allIgniteIds = getAllIgniteIds(ignites);
    const igniteIdsByCategory = getIgniteIdsByCategory(ignites);

    return { allIgniteIds, igniteIdsByCategory };
  }
};

export const IgniteSelectionPlain = ({
  className,
  ignites,
  spark,
  filterJudgementIgnites = false,
  onBackClick,
  onPublishClick
}: IgniteSelectionPlainProps) => {
  const classes = useStyles();
  const history = useHistory();

  const { allIgniteIds, igniteIdsByCategory } = getIgnites(filterJudgementIgnites, ignites);

  const ignitesIdsOnSpark = spark.ignites ? pluck("igniteId", spark.ignites) : [];

  // TODO: Improve this => currently not very ideal way to store ignitesIdsOnSpark
  const [selectedChips, setSelectedChips] = useState<string[]>(ignitesIdsOnSpark);

  const handleSelectedIgnitesChange = useCallback((ignites: string[]) => setSelectedChips(ignites), []);
  const mostFrequentIgniteIds = useMemo(() => allIgniteIds.slice(0, 10), [allIgniteIds]);

  const onBackIconClick = () => (onBackClick ? onBackClick() : history.goBack());

  const handleIgniteChipClick = (clickedChip: string) => {
    // Toggle
    if (selectedChips.includes(clickedChip)) {
      setSelectedChips(selectedChips.filter((item) => item !== clickedChip));
    } else {
      setSelectedChips([...selectedChips, clickedChip]);
    }
  };

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="persistent"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        root: classes.drawer,
        paper: clsx(classes.drawerPaper, className)
      }}
      PaperProps={{
        elevation: 4
      }}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" aria-label="Go back" onClick={() => onBackIconClick()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" className={classes.dialogTitle}>
          Ignite
        </Typography>

        <Button color="primary" variant="outlined" onClick={() => onPublishClick(selectedChips)}>
          Publish
        </Button>
      </Toolbar>

      <IgniteSearchSection
        allIgniteIds={allIgniteIds}
        selectedIgnites={selectedChips}
        handleSelectedIgnitesChange={handleSelectedIgnitesChange}
      />

      <Box style={{ padding: 16 }}>
        <Typography variant="caption">
          Ignites engage us all in building an understanding of perspectives and how they interact.
        </Typography>

        <Box className={classes.mostFrequent}>
          <Typography variant="subtitle1">Most Frequent</Typography>
          <Divider className={classes.mostFrequentTextDivider} />
          <IgniteChipsContainer
            igniteIds={mostFrequentIgniteIds}
            selectedIgniteIds={selectedChips}
            handleIgniteChipClick={handleIgniteChipClick}
            igniteIdsByCategory={igniteIdsByCategory}
          />
        </Box>

        <Box height={`calc(100vh - 375px)`} overflow="hidden scroll">
          <IgniteListSection
            filterJudgementIgnites={filterJudgementIgnites}
            selectedIgniteIds={selectedChips}
            igniteIdsByCategory={igniteIdsByCategory}
            handleIgniteChipClick={handleIgniteChipClick}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

type Props = {
  sparkId?: string;
};

const IgniteSelectionController = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuthStore();
  const { sparkId: sparkIdFromParams }: RouteParams = useParams();

  const sparkId = sparkIdFromParams || props.sparkId;

  const [getIgnitesResult] = useQuery<{ ignites: IgniteGroup[] }>({ query: GET_IGNITES });
  const [getSparkResult] = useQuery<{ spark: Spark }>({
    query: GET_SPARK,
    variables: { id: sparkId },
    pause: !sparkId
  });
  const [, assignIgnites] = useMutation<SparkIgnite, AssignIgnitesInput>(ASSIGN_IGNITES);

  const { fetching: fetchingIgnites, error: erroredGetIgnites, data: ignitesData } = getIgnitesResult;
  const { fetching: fetchingSpark, error: erroredGetSpark, data: sparkData } = getSparkResult;

  if (fetchingSpark || fetchingIgnites) {
    return (
      <Drawer
        open={true}
        anchor="right"
        variant="persistent"
        PaperProps={{
          className: classes.loadingDrawer
        }}
      >
        <CenteredComponent>
          <CircularProgress />
        </CenteredComponent>
      </Drawer>
    );
  }

  if (erroredGetIgnites || erroredGetSpark) {
    return (
      <Drawer
        open={true}
        anchor="right"
        variant="persistent"
        PaperProps={{
          className: classes.loadingDrawer
        }}
      >
        <Box>Error....</Box>
      </Drawer>
    );
  }

  if (ignitesData && sparkData) {
    // Filter judgement ignites if logged in user is the spark author
    const isIgniteonOwnSpark = user?.id === sparkData.spark.member.id;

    const onPublishClick = (selectedChips: string[]) => {
      const sparkmapId = sparkData.spark.sparkmap.id;

      assignIgnites({ ignitesIds: selectedChips, sparkId: sparkId! })
        .then(() => {
          history.push(`/sparkmap/${sparkmapId}/view-spark/${sparkId}`);
        })
        .catch((err) => {
          console.error("Error assigning ignites", err);
        });
    };

    const ignites = ignitesData.ignites;
    return (
      <IgniteSelectionPlain
        filterJudgementIgnites={Boolean(isIgniteonOwnSpark)}
        onPublishClick={onPublishClick}
        spark={sparkData.spark}
        ignites={ignites}
      />
    );
  }

  return null;
};

IgniteSelectionPlain.defaultProps = {
  spark: {
    title: "New Spark",
    id: "",
    ignites: ""
  }
};

export default IgniteSelectionController;
