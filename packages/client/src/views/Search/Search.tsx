import { Box, Divider, Drawer, IconButton, InputBase, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close as CloseIcon, Search as SearchIcon } from "@material-ui/icons";
import { GET_SEARCH } from "apollo/Queries/Search";
import clsx from "clsx";
import { useActiveOrbitUpdateDispatch } from "contexts";
import React, { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { HEADER_HEIGHT, SIDEBAR_WIDTH, Spark, ZINDICES } from "types";
import { useClient } from "urql";
import SearchResults from "views/SearchResults";
import IgniteSelectionSection from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    minWidth: 52
  },
  drawerPaper: {
    marginTop: `-(${HEADER_HEIGHT})px`,
    width: SIDEBAR_WIDTH,
    zIndex: ZINDICES.searchDrawer
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1.75, 5, 1.75, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "38ch"
    }
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchIcon: {
    paddingRight: "20px"
  }
}));

type RecentItem = {
  keywords: string[];
  igniteIds: string[];
};

type SearchProps = {
  handleInputChange: (data: RecentItem) => void;
  recentItems?: RecentItem[];
};

function useRouteQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = ({ handleInputChange }: SearchProps) => {
  const classes = useStyles();
  const history = useHistory();
  const query = useRouteQuery();

  const isSearchResultRoute = useRouteMatch("/search/results");

  const keywordsQuery = query.get("keywords")?.split(",") ?? [];
  const igniteIdsQuery = query.get("ignites")?.split(",") ?? [];

  const [selectedIgniteIds, setSelectedIgniteIds] = useState<string[]>(igniteIdsQuery);
  const [inputValue, setInputValue] = useState(keywordsQuery.join());

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.length) {
      handleInputChange({ keywords: inputValue.split(","), igniteIds: selectedIgniteIds });
    }
  };

  const handleIgniteChipClick = (igniteId: string) => {
    const isClickedIgniteSelected = selectedIgniteIds.includes(igniteId);
    if (selectedIgniteIds.length < 5 || isClickedIgniteSelected) {
      // Toggle
      if (isClickedIgniteSelected) {
        setSelectedIgniteIds(selectedIgniteIds.filter((item) => item !== igniteId));
        return;
      }

      setSelectedIgniteIds([...selectedIgniteIds, igniteId]);
    }
  };

  const exitSearchView = () => {
    history.push(`/sparkmap`);
  };

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="persistent"
      classes={{
        paper: classes.drawerPaper
      }}
      PaperProps={{
        elevation: 0
      }}
    >
      <Box>
        <div className={classes.searchContainer}>
          <div className={classes.icon}>
            <IconButton onClick={exitSearchView}>
              <CloseIcon />
            </IconButton>
          </div>

          <form onSubmit={handleSearchSubmit}>
            <InputBase
              value={inputValue}
              autoFocus
              onChange={({ currentTarget }) => {
                setInputValue(currentTarget.value);
              }}
              classes={{
                root: classes.input,
                input: classes.inputInput
              }}
              placeholder="Search Hunome"
              inputProps={{ "aria-label": "search" }}
            />
          </form>

          <div className={clsx(classes.icon, classes.searchIcon)}>
            <IconButton onClick={handleSearchSubmit}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        {/* TODO: Replace this hardcoded recent search items with data received from API when working on Search view */}
        {/* <List disablePadding>
          {items.map(({ keyword, igniteIds }, idx) => (
            <React.Fragment key={`${keyword}-${igniteIds.join("-")}`}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar className={classes.avatar}>
                  <HistoryIcon color="action" />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body2">{keyword}</Typography>}
                  secondary={
                    <Typography variant="caption" color="textSecondary">
                      {igniteIds.join(", ")}
                    </Typography>
                  }
                />
              </ListItem>
              {idx !== indexToHideDivider && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List> */}

        <Divider />

        {!Boolean(isSearchResultRoute) && (
          <Box padding="24px 16px">
            <Typography variant="h6">Ignite your search</Typography>
            <Typography variant="caption">
              Choose ignites to specify your search, {selectedIgniteIds.length}/5 selected
            </Typography>

            <IgniteSelectionSection
              selectedIgniteIds={selectedIgniteIds}
              handleIgniteChipClick={handleIgniteChipClick}
            />
          </Box>
        )}

        {isSearchResultRoute && <SearchResults />}
      </Box>
    </Drawer>
  );
};

type SearchControllerProps = {
  handleOrbitResultChange: (sparks: Spark[]) => void;
};

const SearchController = ({ handleOrbitResultChange }: SearchControllerProps) => {
  const client = useClient();
  const history = useHistory();
  const dispatch = useActiveOrbitUpdateDispatch();

  const [searchVar, setSearchVar] = useState<RecentItem>({
    keywords: [],
    igniteIds: []
  });

  const getSearchResult = (keywords: string[], igniteIds: string[]) => {
    client
      .query(GET_SEARCH, {
        keywords,
        igniteIds
      })
      .toPromise()
      .then((result) => {
        const mainOrbitSparks = result.data?.search?.mainOrbit.sparks;
        if (mainOrbitSparks && mainOrbitSparks.length) {
          dispatch({
            type: "update_orbit_store",
            payload: mainOrbitSparks
          });

          history.push("/search/results");
        } else {
          dispatch({
            type: "update_orbit_store",
            payload: []
          });
        }
      });
  };

  return (
    <Search
      handleInputChange={({ keywords, igniteIds }) => {
        setSearchVar({ ...searchVar, keywords, igniteIds });
        getSearchResult(keywords, igniteIds);
      }}
    />
  );
};

export default SearchController;
