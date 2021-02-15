import { Box, Card, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

type ResultCardWrapperProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "16px"
  },
  actionArea: {
    height: 245,
    borderRadius: "16px",
    padding: theme.spacing(3)
  }
}));

const ResultCardWrapper = ({ children }: ResultCardWrapperProps) => {
  const classes = useStyles();

  const [elevation, setElevation] = useState(1);

  const handleMouseOver = () => {
    setElevation(3);
  };

  const handleMouseLeave = () => {
    setElevation(1);
  };

  return (
    <Card elevation={elevation} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className={classes.root}>
      <CardActionArea component="div" className={classes.actionArea}>
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px 0">
          {children}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ResultCardWrapper;
