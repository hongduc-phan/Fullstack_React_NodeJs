import { useMutation } from "urql";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PhotoLibrary as PhotoLibraryIcon, Publish as PublishIcon } from "@material-ui/icons";
import { SINGLE_UPLOAD_MUTATION } from "apollo/Mutations";
import IllustrationsDialog from "components/IllustrationsDialog";
import React, { useCallback, useState } from "react";

type ImageDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleImageSelection: (imgSrc: string) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  listContainer: {
    padding: "0 20px"
  },
  listItem: {
    padding: 8,
    paddingLeft: 0
  },
  avatar: {
    backgroundColor: "transparent",
    color: theme.palette.text.secondary
  },
  input: {
    display: "none"
  },
  formAction: {
    padding: 0,
    margin: "14px 16px"
  }
}));

const ImageDialog = ({ open, handleClose, handleImageSelection }: ImageDialogProps) => {
  const classes = useStyles();

  const [, singleImageUpload] = useMutation(SINGLE_UPLOAD_MUTATION);
  const [openIllustrationSelection, setOpenIllustrationSelection] = useState(false);

  const handleIllustrationSelection = useCallback(() => setOpenIllustrationSelection(true), []);
  const handleIllustrationSelectionClose = useCallback(() => setOpenIllustrationSelection(false), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = e.target;
    const file = files && files[0];

    if (validity.valid) {
      singleImageUpload({ file }).then((response) => {
        const imgPath = response.data.singleUpload.url;
        handleImageSelection(imgPath);
      });
    }
  };

  return (
    <>
      <Dialog aria-label="add-image-dialog" open={open} disableBackdropClick>
        <DialogTitle>Add image</DialogTitle>
        <List className={classes.listContainer} disablePadding>
          <label htmlFor="upload-image">
            <ListItem className={classes.listItem} button>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PublishIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Upload image" primaryTypographyProps={{ variant: "subtitle1" }} />
              <input
                accept="image/*"
                type="file"
                id="upload-image"
                required
                className={classes.input}
                onChange={handleChange}
              />
            </ListItem>
          </label>

          <label htmlFor="select-from-hunome-gallery">
            <ListItem
              aria-label="select-from-hunome-gallery"
              id="select-from-hunome-gallery"
              autoFocus
              button
              className={classes.listItem}
              onClick={handleIllustrationSelection}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PhotoLibraryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Select from Hunome" primaryTypographyProps={{ variant: "subtitle1" }} />
            </ListItem>
          </label>
        </List>

        <DialogActions className={classes.formAction}>
          <Button
            aria-label="cancel-image-selection"
            variant="outlined"
            autoFocus
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {openIllustrationSelection && (
        <IllustrationsDialog
          open={openIllustrationSelection}
          handleImageSelection={handleImageSelection}
          handleClose={handleIllustrationSelectionClose}
        />
      )}
    </>
  );
};

export default React.memo(ImageDialog);
