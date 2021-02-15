import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Image1 from "assets/one.png";
import Image2 from "assets/two.png";
import Image3 from "assets/three.png";
import Image4 from "assets/four.png";
import { Dialog, DialogActions, Button, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      backgroundColor: theme.palette.background.paper,
      margin: `${theme.spacing(0, 3)}`
    },
    gridList: {
      maxHeight: "80vh"
    },
    formAction: {
      padding: 0,
      margin: "14px 16px"
    },
    imgGrid: {
      cursor: "pointer"
    }
  })
);

const tileData = [
  {
    key: 1,
    img: Image1,
    title: "Image1"
  },
  {
    key: 2,
    img: Image2,
    title: "Image2"
  },
  {
    key: 3,
    img: Image3,
    title: "Image3"
  },
  {
    key: 4,
    img: Image1,
    title: "Image1"
  },
  {
    key: 5,
    img: Image2,
    title: "Image2"
  },
  {
    key: 6,
    img: Image3,
    title: "Image3"
  },
  {
    key: 7,
    img: Image4,
    title: "Image4"
  },
  {
    key: 8,
    img: Image2,
    title: "Image2"
  },
  {
    key: 9,
    img: Image3,
    title: "Image3"
  },
  {
    key: 10,
    img: Image1,
    title: "Image1"
  },
  {
    key: 11,
    img: Image4,
    title: "Image4"
  },
  {
    key: 12,
    img: Image3,
    title: "Image3"
  },
  {
    key: 13,
    img: Image1,
    title: "Image1"
  },
  {
    key: 14,
    img: Image2,
    title: "Image2"
  },
  {
    key: 15,
    img: Image3,
    title: "Image3"
  },
  {
    key: 16,
    img: Image3,
    title: "Image3"
  },
  {
    key: 17,
    img: Image4,
    title: "Image4"
  },
  {
    key: 18,
    img: Image2,
    title: "Image2"
  },
  {
    key: 19,
    img: Image3,
    title: "Image3"
  },
  {
    key: 20,
    img: Image3,
    title: "Image3"
  }
];

type IllustrationsDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleImageSelection: (imgSrc: string) => void;
};

const IllustrationsDialog: React.FC<IllustrationsDialogProps> = ({ open, handleClose, handleImageSelection }) => {
  const classes = useStyles();

  const handleImageClick = (e: any) => {
    handleImageSelection(e.target.src);
  };

  return (
    <Dialog open={open} maxWidth="md" aria-label="select-from-hunome-gallery" disableBackdropClick>
      <DialogTitle>Select Image</DialogTitle>
      <div className={classes.root}>
        <GridList cellHeight={120} className={classes.gridList} cols={4} spacing={24}>
          {tileData.map((tile) => (
            <GridListTile key={tile.key} cols={1}>
              <img src={tile.img} alt={tile.title} onClick={handleImageClick} className={classes.imgGrid} />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <DialogActions className={classes.formAction}>
        <Button
          aria-label="cancel-selection-from-hunome-gallery"
          variant="outlined"
          autoFocus
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(IllustrationsDialog);
