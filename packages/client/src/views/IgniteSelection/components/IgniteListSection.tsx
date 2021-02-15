import { Collapse, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Agreement, GutFeel, Human, Knowtype, Relevance, Style, Time } from "assets/icons";
import clsx from "clsx";
import React, { memo, useState } from "react";
import { IgniteCategories, IgniteSubCategories } from "types";
import { IgniteIdsByCategory } from "utils";
import IgniteChipsContainer from "./IgniteChipsContainer";

type IgniteListSectionProps = {
  selectedIgniteIds: string[];
  igniteIdsByCategory: IgniteIdsByCategory[];
  hideSecondaryText?: boolean;
  filterJudgementIgnites?: boolean;
  handleIgniteChipClick: (clickedChip: string) => void;
};

type IgniteCategoryItemProps = {
  primaryText?: string;
  secondaryText?: string;
  category: IgniteCategories;
  Icon: JSX.Element;
  subCategories?: IgniteSubCategories[];
  igniteIds: string[];
  subIgniteIds?: string[][];
  selectedChips: string[];
  igniteIdsByCategory: IgniteIdsByCategory[];
  expandedCategory: IgniteCategories | IgniteSubCategories | undefined;
  handleIgniteChipClick: (clickedChip: string) => void;
  handleIconExpand: (igniteCategoryTitle: IgniteCategories | IgniteSubCategories) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  ignitesContainer: {
    paddingLeft: theme.spacing(8.5)
  },
  subcategoryItem: {
    paddingLeft: 70,
    paddingBottom: 10
  },
  subIgnitesContainer: {
    marginBottom: theme.spacing(2)
  },
  avatarItem: {
    height: 40,
    width: 40
  },
  listRoot: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing("auto", -2)
  },
  listDivider: {
    marginLeft: theme.spacing(9)
  },
  listBottomDivider: {
    marginTop: 20
  }
}));

const getIgniteIdsOfCategory = (igniteIdsByCategory: IgniteIdsByCategory[], categoryId: string) => {
  const filtered = igniteIdsByCategory.find((item) => item.id === categoryId);
  return filtered?.ignites ?? [];
};

const IgniteCategoryItem = memo(
  ({
    primaryText,
    secondaryText,
    category,
    Icon,
    subCategories,
    expandedCategory,
    handleIgniteChipClick,
    handleIconExpand,
    igniteIds,
    igniteIdsByCategory,
    subIgniteIds,
    selectedChips
  }: IgniteCategoryItemProps) => {
    const classes = useStyles();
    const isCategoryExpanded = expandedCategory === category;

    const [expandedSubCategory, setExpandedSubCategory] = useState<IgniteSubCategories | undefined>(undefined);

    const handleSubCategoryExpand = (igniteCategoryTitle: IgniteSubCategories) => {
      if (expandedSubCategory === igniteCategoryTitle) {
        setExpandedSubCategory(undefined);
      } else {
        setExpandedSubCategory(igniteCategoryTitle);
      }
    };

    return (
      <>
        <ListItem button onClick={() => handleIconExpand(category)}>
          <ListItemAvatar className={classes.avatarItem}>{Icon}</ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                style={{
                  color: isCategoryExpanded ? "#385B97" : "inherit"
                }}
              >
                {primaryText}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary">
                {secondaryText}
              </Typography>
            }
          />

          {isCategoryExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {!isCategoryExpanded && <Divider component="li" variant="fullWidth" className={classes.listDivider} />}

        <Collapse in={isCategoryExpanded} timeout="auto" unmountOnExit>
          {subCategories?.map((subCategory, idx) => (
            <React.Fragment key={subCategory}>
              <ListItem button onClick={() => handleSubCategoryExpand(subCategory)} className={classes.subcategoryItem}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      style={{
                        textTransform: "capitalize",
                        color: expandedSubCategory === subCategory ? "#385B97" : "inherit"
                      }}
                    >
                      {subCategory}
                    </Typography>
                  }
                />
                {expandedSubCategory === subCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {expandedSubCategory === subCategory && (
                <IgniteChipsContainer
                  className={clsx(classes.ignitesContainer, classes.subIgnitesContainer)}
                  categoryId={subCategory}
                  igniteIdsByCategory={igniteIdsByCategory}
                  igniteIds={subIgniteIds![idx]}
                  selectedIgniteIds={selectedChips}
                  handleIgniteChipClick={handleIgniteChipClick}
                />
              )}
            </React.Fragment>
          ))}

          {!subCategories && (
            <React.Fragment>
              <IgniteChipsContainer
                className={classes.ignitesContainer}
                categoryId={category}
                igniteIdsByCategory={igniteIdsByCategory}
                igniteIds={igniteIds}
                selectedIgniteIds={selectedChips}
                handleIgniteChipClick={handleIgniteChipClick}
              />
              <Divider component="li" variant="fullWidth" className={classes.listBottomDivider} />
            </React.Fragment>
          )}
        </Collapse>
      </>
    );
  }
);

const IgniteListSection = ({
  igniteIdsByCategory,
  selectedIgniteIds,
  handleIgniteChipClick,
  filterJudgementIgnites = false,
  hideSecondaryText = false
}: IgniteListSectionProps) => {
  const classes = useStyles();

  const [expandedCategory, setExpandedCategory] = useState<IgniteCategories | IgniteSubCategories | undefined>(
    undefined
  );

  const handleIconExpand = (igniteCategoryTitle: IgniteCategories | IgniteSubCategories) => {
    if (expandedCategory === igniteCategoryTitle) {
      setExpandedCategory(undefined);
      return;
    }
    setExpandedCategory(igniteCategoryTitle);
  };

  return (
    <List component="nav" aria-labelledby="ignite list of categories" className={classes.listRoot}>
      {!filterJudgementIgnites && (
        <IgniteCategoryItem
          category="gutfeel"
          Icon={<GutFeel />}
          primaryText="Gut feel"
          secondaryText={!hideSecondaryText ? "What is your quick feel on this Spark?" : undefined}
          igniteIdsByCategory={igniteIdsByCategory}
          igniteIds={getIgniteIdsOfCategory(igniteIdsByCategory, "gutfeel")}
          selectedChips={selectedIgniteIds}
          expandedCategory={expandedCategory}
          handleIconExpand={handleIconExpand}
          handleIgniteChipClick={handleIgniteChipClick}
        />
      )}

      <IgniteCategoryItem
        category="knowtypes"
        Icon={<Knowtype />}
        primaryText="Knowtype"
        secondaryText={!hideSecondaryText ? "What is the type of “knowing” in this Spark?" : undefined}
        igniteIdsByCategory={igniteIdsByCategory}
        igniteIds={getIgniteIdsOfCategory(igniteIdsByCategory, "knowtypes")}
        selectedChips={selectedIgniteIds}
        expandedCategory={expandedCategory}
        handleIconExpand={handleIconExpand}
        handleIgniteChipClick={handleIgniteChipClick}
      />

      <IgniteCategoryItem
        category="human"
        Icon={<Human />}
        subCategories={["human context", "human systems"]}
        primaryText="Human"
        secondaryText={!hideSecondaryText ? "What human context or system is this Spark about?" : undefined}
        igniteIdsByCategory={igniteIdsByCategory}
        igniteIds={[]}
        subIgniteIds={[
          getIgniteIdsOfCategory(igniteIdsByCategory, "human context"),
          getIgniteIdsOfCategory(igniteIdsByCategory, "human systems")
        ]}
        selectedChips={selectedIgniteIds}
        expandedCategory={expandedCategory}
        handleIconExpand={handleIconExpand}
        handleIgniteChipClick={handleIgniteChipClick}
      />

      <IgniteCategoryItem
        category="time"
        Icon={<Time />}
        subCategories={["future", "enduring", "change"]}
        primaryText="Time"
        secondaryText={!hideSecondaryText ? "What is the timeframe of this Spark?" : undefined}
        igniteIdsByCategory={igniteIdsByCategory}
        igniteIds={getIgniteIdsOfCategory(igniteIdsByCategory, "time")}
        subIgniteIds={[
          getIgniteIdsOfCategory(igniteIdsByCategory, "future"),
          getIgniteIdsOfCategory(igniteIdsByCategory, "enduring"),
          getIgniteIdsOfCategory(igniteIdsByCategory, "change")
        ]}
        selectedChips={selectedIgniteIds}
        expandedCategory={expandedCategory}
        handleIconExpand={handleIconExpand}
        handleIgniteChipClick={handleIgniteChipClick}
      />

      <IgniteCategoryItem
        category="relevance"
        Icon={<Relevance />}
        subCategories={["relevance to humanity", "relevance to me", "relevance to some"]}
        primaryText="Relevance"
        secondaryText={!hideSecondaryText ? "What is the focus of relevance of this Spark?" : undefined}
        igniteIdsByCategory={igniteIdsByCategory}
        igniteIds={[]}
        subIgniteIds={[
          getIgniteIdsOfCategory(igniteIdsByCategory, "relevance to humanity"),
          getIgniteIdsOfCategory(igniteIdsByCategory, "relevance to me"),
          getIgniteIdsOfCategory(igniteIdsByCategory, "relevance to some")
        ]}
        selectedChips={selectedIgniteIds}
        expandedCategory={expandedCategory}
        handleIconExpand={handleIconExpand}
        handleIgniteChipClick={handleIgniteChipClick}
      />

      {!filterJudgementIgnites && (
        <IgniteCategoryItem
          category="agreement"
          Icon={<Agreement />}
          primaryText="Agreement"
          secondaryText={!hideSecondaryText ? "What is the level of agreement with this Spark?" : undefined}
          igniteIdsByCategory={igniteIdsByCategory}
          igniteIds={getIgniteIdsOfCategory(igniteIdsByCategory, "agreement")}
          selectedChips={selectedIgniteIds}
          expandedCategory={expandedCategory}
          handleIconExpand={handleIconExpand}
          handleIgniteChipClick={handleIgniteChipClick}
        />
      )}

      {!filterJudgementIgnites && (
        <IgniteCategoryItem
          category="writing style"
          Icon={<Style />}
          primaryText="Writing Style"
          secondaryText={!hideSecondaryText ? "What is the style of writing of this Spark?" : undefined}
          igniteIdsByCategory={igniteIdsByCategory}
          igniteIds={getIgniteIdsOfCategory(igniteIdsByCategory, "writing style")}
          selectedChips={selectedIgniteIds}
          expandedCategory={expandedCategory}
          handleIconExpand={handleIconExpand}
          handleIgniteChipClick={handleIgniteChipClick}
        />
      )}
    </List>
  );
};

export default IgniteListSection;
