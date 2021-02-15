import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import { DELETE_SPARK } from "apollo/Mutations";
import { GET_SPARKS } from "apollo/Queries";
import DraftImage from "assets/draftimage.png";
import CenteredTextComponent from "components/reusable/CenteredTextComponent";
import { formatDistanceToNow, parseISO } from "date-fns";
import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RouteParams, Spark } from "types";
import { useMutation, useQuery } from "urql";

const useStyles = makeStyles((theme: Theme) => ({
  headerText: {
    display: "block",
    padding: theme.spacing(0, 0, 1.25, 3)
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: theme.spacing(1.25, 2)
  },
  avatarItem: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    height: 64,
    width: 64
  }
}));

// * This is temporary until lastmodified info for a draft spark is available
const randomdates = [
  new Date("2020-06-14").toISOString(),
  new Date("2020-06-13").toISOString(),
  new Date("2020-06-12").toISOString(),
  new Date("2020-06-11").toISOString(),
  new Date("2020-05-21").toISOString(),
  new Date("2020-01-30").toISOString(),
  new Date("2020-01-10").toISOString(),
  new Date("2020-03-20").toISOString()
];

type DraftProps = {
  draftSparks: Spark[];
  sparkmapId: string;
  handleSparkEdit: (sparkId: string) => void;
  handleSparkDelete: (sparkId: string | undefined) => void;
};

const DraftListComponent = ({ draftSparks, handleSparkDelete, handleSparkEdit, sparkmapId }: DraftProps) => {
  const classes = useStyles();
  const [activeHoverItem, setActiveHoverItem] = useState<string | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSparkActionDialog, setOpenSparkActionDialog] = useState(false);

  const handleSparkActionDialogOpen = () => {
    handleMenuClose();
    setOpenSparkActionDialog(true);
  };

  const handleSparkActionDialogClose = () => {
    setOpenSparkActionDialog(false);
  };

  const handleMouseOver = useCallback((value: string) => {
    setActiveHoverItem(value);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveHoverItem(undefined);
  }, []);

  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onSparkDelete = () => {
    handleSparkDelete(activeHoverItem);
    handleSparkActionDialogClose();
  };

  return (
    <Box>
      <Typography variant="overline" className={classes.headerText}>
        The text content is missing
      </Typography>
      <Divider variant="fullWidth" />
      <Grid item xs={12} md={12}>
        <List>
          {draftSparks &&
            draftSparks.map(({ id, title, backgroundImage }, index) => (
              <React.Fragment key={id}>
                <ListItem
                  className={classes.listItem}
                  onMouseLeave={handleMouseLeave}
                  onMouseOver={() => {
                    if (activeHoverItem !== id) {
                      handleMouseOver(id);
                    }
                  }}
                >
                  <ListItemAvatar className={classes.avatarItem}>
                    <Avatar alt="draft icon" src={backgroundImage ?? DraftImage} className={classes.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                      variant: "subtitle1"
                    }}
                    secondary={formatDistanceToNow(parseISO(randomdates[1]), { addSuffix: true })}
                  />
                  {activeHoverItem === id && (
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="open draft spark actions"
                        edge="end"
                        color="inherit"
                        onClick={handleMenuIconClick}
                      >
                        <MoreIcon />
                      </IconButton>
                      <Menu
                        id="draft spark actions menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleSparkEdit(activeHoverItem)}>Edit</MenuItem>
                        <MenuItem onClick={handleSparkActionDialogOpen}>Delete</MenuItem>
                      </Menu>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                {openSparkActionDialog && (
                  <Dialog
                    open={openSparkActionDialog}
                    maxWidth="xs"
                    aria-label="draft spark action modal"
                    disableBackdropClick
                    onClose={handleSparkActionDialogClose}
                  >
                    <DialogTitle>Are you sure you would like to delete the draft spark?</DialogTitle>
                    <DialogContent>
                      <Typography variant="body2" component="article" data-testid="terms-content">
                        This action is irreversible
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        aria-label="close-terms-conditions-modal"
                        autoFocus
                        onClick={handleSparkActionDialogClose}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button color="primary" onClick={onSparkDelete}>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </React.Fragment>
            ))}
        </List>
      </Grid>
    </Box>
  );
};

type RootState = {
  spark: {
    sparkmap: string;
    sparks: Spark[];
  };
};

const DraftController = () => {
  const history = useHistory();
  const { sparkmapId }: RouteParams = useParams();
  const [deleteSparkResult, deleteSpark] = useMutation(DELETE_SPARK);
  const [getSparks] = useQuery<{ sparks: Spark[] }>({
    query: GET_SPARKS,
    variables: { sparkmapId: sparkmapId }
  });

  const handleSparkDelete = (id: string | undefined) => {
    const variables = { sparkId: id };
    deleteSpark(variables)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSparkEdit = (sparkId: string) => {
    history.push(`/spark/${sparkmapId}/edit-draft-spark/${sparkId}`);
  };

  const { fetching: sparkDeleteInProgress, error: sparkDeleteErr } = deleteSparkResult;

  if (!sparkmapId) {
    return <CenteredTextComponent>Cannot fetch drafts for invalid sparkmap</CenteredTextComponent>;
  }

  if (sparkDeleteInProgress || getSparks.fetching) return <CenteredTextComponent>Updating...</CenteredTextComponent>;
  if (sparkDeleteErr) return <CenteredTextComponent>Couldn't delete the spark</CenteredTextComponent>;

  return (
    <DraftListComponent
      sparkmapId={sparkmapId}
      draftSparks={getSparks.data!.sparks}
      handleSparkEdit={handleSparkEdit}
      handleSparkDelete={handleSparkDelete}
    />
  );
};

export default DraftController;
