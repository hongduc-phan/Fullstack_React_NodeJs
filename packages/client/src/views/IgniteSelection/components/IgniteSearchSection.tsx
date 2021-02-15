import { Box, Chip, IconButton, InputBase, Popper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Done as DoneIcon, Search as SearchIcon } from "@material-ui/icons";
import { Autocomplete, AutocompleteCloseReason } from "@material-ui/lab";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { ZINDICES } from "types";

type Props = {
  allIgniteIds: string[];
  selectedIgnites: string[];
  handleSelectedIgnitesChange: (igniteIds: string[]) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      width: 612,
      borderBottom: "1px solid rgba(0, 0, 0, 0.38)",
      fontSize: 14
    },
    searchInput: {
      flex: 1,
      marginLeft: theme.spacing(2)
    },
    searchIcon: {
      padding: 10,
      marginRight: 10
    },
    popper: {
      marginTop: theme.spacing(-5),
      marginRight: theme.spacing(-0.75),
      borderRadius: 3,
      width: 614,
      zIndex: ZINDICES.igniteSearchPopper,
      color: "#586069",
      backgroundColor: "#f6f8fa",
      fontSize: 14
    },
    inputBase: {
      padding: 10,
      width: "100%",
      borderBottom: "1px solid #dfe2e5",
      flex: 1,
      marginLeft: theme.spacing(1.25),
      marginRight: theme.spacing(0)
    },
    autoCompleteInput: {
      width: 614
    },
    paper: {
      margin: 0,
      color: "#586069",
      fontSize: 13,
      width: 614,
      borderRadius: 0
    },
    option: {
      width: 614,
      minHeight: "auto",
      alignItems: "center",
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent"
      },
      '&[data-focus="true"]': {
        backgroundColor: theme.palette.action.hover
      }
    },
    autoCompleteListBox: {
      maxHeight: "80vh"
    },
    popperDisablePortal: {
      position: "relative",
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.38)"
    },
    chip: {
      textTransform: "capitalize"
    }
  })
);

const IgniteSearchSection = ({ allIgniteIds, selectedIgnites, handleSelectedIgnitesChange }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string[]>(selectedIgnites);
  const [pendingValue, setPendingValue] = useState<string[]>(selectedIgnites);
  const [inputLength, setInputLength] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => {
    if (reason === "toggleInput") {
      return;
    }
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
    handleSelectedIgnitesChange(pendingValue);
  };

  useEffect(() => {
    setValue(selectedIgnites);
  }, [selectedIgnites]);

  const open = Boolean(anchorEl);
  const id = open ? "ignites-selection" : undefined;

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <InputBase autoFocus className={classes.searchInput} placeholder="Search ignites" onClick={handleClick} />
        <IconButton type="submit" className={classes.searchIcon} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" className={classes.popper}>
        <Autocomplete
          open={inputLength >= 1}
          openOnFocus={false}
          fullWidth
          onClose={handleClose}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
            listbox: classes.autoCompleteListBox
          }}
          value={pendingValue}
          onChange={(_, newValue) => {
            setPendingValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText="No matching Ignite chips found"
          filterSelectedOptions
          filterOptions={(option, state) => {
            return option.filter((item) => item.charAt(0) === state.inputValue);
          }}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Chip
                className={classes.chip}
                icon={selected ? <DoneIcon /> : undefined}
                label={option}
                clickable
                style={{
                  backgroundColor: selected ? "rgb(252,128,172)" : "rgba(0, 0, 0, 0.12)"
                }}
              />
            </React.Fragment>
          )}
          options={allIgniteIds.sort((a, b) => {
            // Display the selected ignites first.
            let ai = value.indexOf(a);
            ai = ai === -1 ? value.length + allIgniteIds.indexOf(a) : ai;
            let bi = value.indexOf(b);
            bi = bi === -1 ? value.length + allIgniteIds.indexOf(b) : bi;
            return ai - bi;
          })}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <Box className={classes.root}>
              <InputBase
                style={{ padding: 5 }}
                autoFocus
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                className={clsx(classes.inputBase, classes.autoCompleteInput)}
                placeholder="Search ignites"
                onChange={(e) => setInputLength(e.target.value.length)}
              />
              <IconButton type="submit" className={classes.searchIcon} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
          )}
        />
      </Popper>
    </React.Fragment>
  );
};

export default React.memo(IgniteSearchSection);
