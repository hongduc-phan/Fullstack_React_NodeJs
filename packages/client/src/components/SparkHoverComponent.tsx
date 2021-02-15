import { Box, Button, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IgniteIcon, SparkIcon } from "assets/icons";
import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// TODO: Remove optionality
type Props = {
  title?: string;
  author?: string;
  description?: string;
  ignitesCount?: number;
  sparkonsCount?: number;
  updatedDatetime?: string;
  sparkUrl?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: "1rem"
  }
}));

const HoveredSparkComponent = ({
  title = "",
  description = "",
  ignitesCount = 0,
  sparkonsCount = 0,
  updatedDatetime,
  sparkUrl = "",
  author = ""
}: Props) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" padding="8px">
      <Box marginBottom="2px" display="flex" alignItems="center" color="rgba(0, 0, 0, 0.6)">
        {/* TODO: Move this into a reusable ignites + sparkons count component; use here and in spark component's pill  */}
        <Box display="flex" alignItems="center">
          <SparkIcon viewBox="0 0 18 18" className={classes.icon} />
          <Typography variant="body2" display="inline">
            {sparkonsCount}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" marginLeft="6px">
          <IgniteIcon viewBox="0 0 18 18" className={classes.icon} />
          <Typography variant="body2" display="inline">
            {ignitesCount}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" marginLeft="6px">
          <Typography variant="body2">
            · {author} ·{" "}
            {updatedDatetime ? formatDistanceToNow(parseISO(updatedDatetime), { addSuffix: true }) : " Unavailable"}
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {description}
      </Typography>

      <Button variant="outlined" color="primary" component={RouterLink} to={sparkUrl}>
        View Spark
      </Button>
    </Box>
  );
};

export default HoveredSparkComponent;
