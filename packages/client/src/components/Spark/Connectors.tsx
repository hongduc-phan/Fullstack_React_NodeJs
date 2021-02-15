import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  common: {
    position: "absolute",
    width: "430px",
    height: "430px"
  },
  top: { transform: "rotateZ(0deg)" },
  bottom: { transform: "rotateZ(180deg)" },
  topRight: { transform: "rotateZ(60deg)" },
  bottomRight: { transform: "rotateZ(120deg)" },
  topLeft: { transform: "rotateZ(300deg)" },
  bottomLeft: { transform: "rotateZ(240deg)" }
}));

type Props = {
  totalConnectors?: number;
};

const Connectors = ({ totalConnectors = 6 }: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={clsx(classes.common, classes.topRight)}>
        <div className="tr"></div>
      </div>

      {totalConnectors > 1 && (
        <div className={clsx(classes.common, classes.bottomRight)}>
          <div className="br"></div>
        </div>
      )}

      {totalConnectors > 2 && (
        <div className={clsx(classes.common, classes.bottom)}>
          <div className="bt"></div>
        </div>
      )}

      {totalConnectors > 3 && (
        <div className={clsx(classes.common, classes.bottomLeft)}>
          <div className="bl"></div>
        </div>
      )}

      {totalConnectors > 4 && (
        <div className={clsx(classes.common, classes.topLeft)}>
          <div className="tl"></div>
        </div>
      )}

      {totalConnectors > 5 && (
        <div className={clsx(classes.common, classes.top)}>
          <div className="tp"></div>
        </div>
      )}
    </>
  );
};

export default Connectors;
