import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  imageContainer: {
    userSelect: "none",
    borderRadius: "50%",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    textAlign: "center"
  }
}));

const colors = ["#FF719D", "#385B97", "#FFD796", "#7B7DA5", "#C1ECF4", "#FF939A", "#FFB398", "#FFCAC3"];

type CircleImageProps = {
  imageUrl?: string | null;
  className: string;
};

const CircleImage = ({ imageUrl, className }: CircleImageProps) => {
  const classes = useStyles();

  return (
    <div
      className={[classes.imageContainer, className].join(" ")}
      style={!imageUrl ? { backgroundColor: colors[Math.floor(Math.random() * Math.floor(colors.length))] } : {}}
    >
      {imageUrl && <img className={classes.image} alt="" src={imageUrl} />}
    </div>
  );
};

export default React.memo(CircleImage);
