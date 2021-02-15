import { Box, Button, Grid, MobileStepper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IgniteChip } from "components/reusable";
import { useProfileSetupStore } from "contexts";
import { flatten } from "ramda";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { BackgroundIgnites, InterestsIgnites, KnowtypeIgnites } from "types";

type Props = {
  onNextClick: () => void;
  onBackClick: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  headerText: {
    textAlign: "center"
  },
  igniteidsContainer: {
    textAlign: "center",
    marginTop: theme.spacing(8)
  },
  igniteIds: {
    minHeight: 275,
    width: 660
  },
  descriptionText: {
    color: "rgba(0, 0, 0, 0.6)",
    letterSpacing: "0.15px",
    margin: "0 auto",
    marginTop: theme.spacing(6)
  },
  button: {
    fontSize: 14,
    padding: theme.spacing(0.5, 2)
  },
  ignitesContainerSubtitle: {
    marginTop: theme.spacing(3)
  },
  stepper: {
    margin: "0 auto",
    marginTop: theme.spacing(6),
    maxWidth: 480,
    flexGrow: 1
  }
}));

type SelectedIgnites = {
  background: string[];
  interests: string[];
  knowtypes: string[];
};

type category = "background" | "interests" | "knowtypes";

type Action = {
  type: "new" | "toggle";
  payload: {
    group: category;
    igniteId: string;
  };
};

function selectedIgnitesReducer(state: SelectedIgnites, action: Action) {
  const { group, igniteId } = action.payload;

  switch (action.type) {
    case "new":
      return {
        ...state,
        [group]: [...state[group], igniteId]
      };

    case "toggle":
      return { ...state, [group]: state[group].filter((item) => item !== igniteId) };

    default:
      throw new Error("Invalid action type");
  }
}

const TermTutorial = ({ onNextClick, onBackClick }: Props) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const { dispatch: dispatchProfileSetup } = useProfileSetupStore();

  // TODO: replace empty bik chips with ones from profile setup context
  const background: string[] = [];
  const interests: string[] = [];
  const knowtypes: string[] = [];

  const [selectedIgnites, dispatch] = useReducer(selectedIgnitesReducer, {
    background,
    interests,
    knowtypes
  });

  const { group, title, igniteIds } = BIKItems[activeIndex];

  const selectedIgnitesCount = selectedIgnites[group].length;
  const isNextBtnDisabled = selectedIgnitesCount === 0;

  const isIgniteSelected = useMemo(
    () => (igniteId: string) => flatten(Object.values(selectedIgnites)).includes(igniteId),
    [selectedIgnites]
  );

  const _handleNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
    onNextClick();
    if (activeIndex === 2) {
      dispatchProfileSetup({
        type: "BIK",
        payload: {
          ...selectedIgnites
        }
      });
    }
  };

  const _handleBack = () => {
    if (activeIndex !== 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
    onBackClick();
  };

  const _handleIgniteClick = useCallback(
    (igniteId: string) => {
      const dispatchType = isIgniteSelected(igniteId) || selectedIgnitesCount === 5 ? "toggle" : "new";

      dispatch({
        type: dispatchType,
        payload: {
          group,
          igniteId
        }
      });
    },
    [group, isIgniteSelected, selectedIgnitesCount]
  );

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" className={classes.headerText}>
        {title}
      </Typography>

      <Grid container direction="column" justify="center" alignItems="center" className={classes.igniteidsContainer}>
        <Box className={classes.igniteIds}>
          {igniteIds.map((igniteId, idx) => (
            <IgniteChip
              key={`${idx}-${igniteId}`}
              clickable
              capitalizeLabel
              chipLabel={igniteId}
              isSelected={isIgniteSelected(igniteId)}
              onClick={() => _handleIgniteClick(igniteId)}
            />
          ))}
        </Box>

        <Typography variant="caption" color="textSecondary" className={classes.ignitesContainerSubtitle}>
          <Typography variant="caption" color="textSecondary">
            {selectedIgnitesCount}/5 selected
          </Typography>

          <br />

          {selectedIgnitesCount === 0 && (
            <Typography variant="caption" color="textSecondary">
              Select at least one
            </Typography>
          )}
        </Typography>
      </Grid>

      <MobileStepper
        position="static"
        variant="dots"
        steps={3}
        activeStep={activeIndex}
        className={classes.stepper}
        nextButton={
          <Button color="primary" variant="contained" size="medium" onClick={_handleNext} disabled={isNextBtnDisabled}>
            Next
          </Button>
        }
        backButton={
          <Button color="primary" variant="outlined" size="medium" onClick={_handleBack}>
            Back
          </Button>
        }
      />
    </Box>
  );
};

type BIKItem = {
  group: category;
  title: string;
  igniteIds: string[];
};

const BIKItems: BIKItem[] = [
  {
    group: "background",
    title: "My backgrounds are in for example",
    igniteIds: BackgroundIgnites
  },
  {
    group: "interests",
    title: `I'm curious about and seek to understand "humanity and ...`,
    igniteIds: InterestsIgnites
  },
  {
    group: "knowtypes",
    title: "This is how I typically know what I know",
    igniteIds: KnowtypeIgnites
  }
];

export default TermTutorial;
