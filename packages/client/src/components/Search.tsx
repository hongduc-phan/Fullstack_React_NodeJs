import { Box, IconButton, InputBase, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  searchBlock: {
    padding: "2px 0"
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 450
  },
  searchHistory: {
    marginLeft: 8
  },
  iconButton: {
    padding: 10
  }
}));

const Search: React.FC<SearchProps> = ({ handleNavigationToggle }) => {
  const classes = useStyles();
  const [openSearchHistory, setOpenSearchHistory] = useState(false);

  const handleSearchHistoryToggle = () => {
    setOpenSearchHistory(!setOpenSearchHistory);
  };

  return (
    <Paper className={classes.searchBlock}>
      <Box className={classes.searchBar}>
        <Box>
          <IconButton className={classes.iconButton} aria-label="Menu" onClick={handleNavigationToggle}>
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.searchHistory}
            placeholder="Search"
            inputProps={{ "aria-label": "Search Hunome" }}
            onClick={handleSearchHistoryToggle}
          />
        </Box>
      </Box>
    </Paper>
  );
};

type SearchProps = {
  handleNavigationToggle: () => void;
};

export default React.memo(Search);
