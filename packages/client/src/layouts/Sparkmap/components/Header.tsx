import { Avatar, Box, Button, CircularProgress, IconButton, InputBase, Menu, MenuItem, Paper } from "@material-ui/core";
import { darken, makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import { GET_PRIVATE_PROFILE } from "apollo/Queries";
import { Logo, SparkIcon } from "assets/icons";
import clsx from "clsx";
import { MenuItemLink } from "components/reusable";
import { useAuthStore } from "contexts";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MemberPrivateProfile, ZINDICES } from "types";
import { useQuery } from "urql";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    zIndex: ZINDICES.header,
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: theme.spacing(0, 3)
  },
  search: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
    borderRadius: 8200,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: darken(theme.palette.common.white, 0.1)
    }
  },
  inputInput: {
    padding: theme.spacing(1.75, 5, 1.75, 3),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "28ch"
    }
  },
  searchIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "20px"
  }
}));

type HeaderProps = {
  className?: string;
  isSearchRouteActive: boolean;
};

type AvatarComponentProps = {
  handleAvatarClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AvatarComponent = ({ handleAvatarClick }: AvatarComponentProps) => {
  const [{ error, fetching, data }] = useQuery<{
    privateProfile: MemberPrivateProfile;
  }>({ query: GET_PRIVATE_PROFILE });

  if (fetching) return <CircularProgress />;

  if (data || error) {
    return (
      <IconButton onClick={handleAvatarClick}>
        <Avatar alt="user avatar" src={data?.privateProfile.profilePictureUrl ?? "/images/avatar/1.jpg"} />
      </IconButton>
    );
  }

  return null;
};

const Header = ({ className, isSearchRouteActive }: HeaderProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);
  const handleCreateSparkmapClick = () => history.push(`/create-spark/newspark`);
  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);

  const handleLogoutClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    handleClose();
    logout();
  };

  const handleSearchClick = () => {
    history.push(`/search`);
  };

  return (
    <Paper elevation={isSearchRouteActive ? 0 : 2} square className={clsx(className, classes.root)}>
      <Logo />

      {!isSearchRouteActive && (
        <>
          <div className={classes.search} onClick={handleSearchClick}>
            <InputBase
              classes={{
                input: classes.inputInput
              }}
              placeholder="Try searching “Freelance”"
              inputProps={{ "aria-label": "search" }}
            />

            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          </div>

          <Box flexGrow={1} />

          <Box display="grid" gridAutoFlow="column" alignItems="center" gridGap="12px">
            <div>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                startIcon={<SparkIcon />}
                onClick={handleCreateSparkmapClick}
              >
                New SparkMap
              </Button>
            </div>

            <AvatarComponent handleAvatarClick={handleAvatarClick} />

            <Menu id="profile-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItemLink onClick={handleClose} to={`/profile/me`}>
                Profile
              </MenuItemLink>
              <MenuItemLink onClick={handleClose} to={`/profile/editprofile`}>
                Edit Profile
              </MenuItemLink>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default React.memo(Header);
