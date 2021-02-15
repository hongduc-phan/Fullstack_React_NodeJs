import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IgniteIcon, SparkIcon } from "assets/icons";
import { AvatarPlaceholder } from "components";
import { isNil } from "ramda";
import React from "react";
import { Link } from "react-router-dom";
import SparkCircle from "./SparkCircleComponent";

type SparkProps = {
  sparkId: string;
  sparkmapId: string;
  sparkTitle: string;
  author: string;
  sparkDescription?: string;
  sparkonsCount: number;
  ignitesCount: number;
  backgroundImageSrc?: string | null | undefined;
  avatarSrc: string | undefined;
  memberName: string | undefined;
  updatedDatetime?: string;
  additionalInfo?: {
    isCentralSpark?: boolean;
    totalConnectors?: number;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  pillWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#385B97",
    borderRadius: theme.spacing(2),
    color: theme.palette.common.white,
    minWidth: 80,
    maxWidth: 180,
    padding: theme.spacing(0.25, 1),
    marginTop: theme.spacing(-1.75),
    zIndex: 1
  },
  sparkIcon: {
    fontSize: "1.125rem",
    cursor: "pointer"
  },
  igniteIcon: {
    fontSize: "1.25rem"
  },
  sparkOnsLink: {
    textDecoration: "none",
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center"
  },
  avatarWrapper: {
    height: 30,
    width: 30,
    marginBottom: theme.spacing(-3.5),
    marginRight: theme.spacing(-11),
    zIndex: 2
  }
}));

const Spark = ({
  sparkTitle,
  sparkDescription,
  author,
  sparkId,
  sparkmapId,
  backgroundImageSrc,
  additionalInfo,
  avatarSrc,
  memberName,
  sparkonsCount,
  ignitesCount,
  updatedDatetime
}: SparkProps) => {
  const classes = useStyles();
  const sparkUrl = `/sparkmap/view-spark/${sparkId}`;
  return (
    <Box display="flex" alignItems="center" flexDirection="column" padding="0">
      <Box className={classes.avatarWrapper}>
        {!isNil(avatarSrc) ? (
          <Avatar src={avatarSrc} />
        ) : (
          <AvatarPlaceholder>{memberName?.slice(0, 1).toUpperCase() ?? ""}</AvatarPlaceholder>
        )}
      </Box>

      <Link to={sparkUrl}>
        <SparkCircle
          totalConnectors={additionalInfo?.totalConnectors}
          renderWithConnectors={additionalInfo?.isCentralSpark}
          sparkTitle={sparkTitle}
          sparkDescription={sparkDescription}
          author={author}
          sparkonsCount={sparkonsCount}
          sparkUrl={sparkUrl}
          ignitesCount={ignitesCount}
          backgroundImageSrc={backgroundImageSrc}
          updatedDatetime={updatedDatetime}
        />
      </Link>

      <Box className={classes.pillWrapper}>
        <Box display="flex" alignItems="center">
          <Link to={`/sparkmap/sparkonslist/${sparkId}`} className={classes.sparkOnsLink}>
            <SparkIcon className={classes.sparkIcon} />
          </Link>
          <Typography variant="body2" display="inline">
            {sparkonsCount}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <IgniteIcon viewBox="0 0 18 18" className={classes.igniteIcon} />
          <Typography variant="body2" display="inline">
            {ignitesCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Spark);
