import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Spark } from "types";
import { IgniteIcon, SparkIcon } from "assets/icons";
import { formatDistance } from "date-fns";
import { CircleImage } from ".";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: 15,
    borderBottomColor: "rgba(0, 0, 0, 0.12)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    display: "grid",
    gridTemplateColumns: "50px 1fr",
    columnGap: 7,
    cursor: 'pointer'
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.87)"
  },
  stats: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    "& span": {
      marginRight: theme.spacing(1)
    }
  },
  description: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: "rgba(0, 0, 0, 0.87)",
    marginTop: 15
  },
  sparkIcon: {
    fontSize: "1.125rem"
  },
  igniteIcon: {
    fontSize: "1.25rem"
  },
  topParticipants: {
    marginTop: theme.spacing(3)
  },
  topParticipantsHeader: {
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: 0.4,
    color: "rgba(0, 0, 0, 0.6)"
  },
  topIgnites: {
    marginTop: theme.spacing(3)
  },
  topIgnitesHeader: {
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: 0.4,
    color: "rgba(0, 0, 0, 0.6)"
  },
  topParticipantsIcons: {
    display: "flex",
    marginTop: theme.spacing(2)
  },
  sparkImageContainer: {
    height: 50,
    width: 50
  },
  topParticipantsImages: {
    height: 25,
    width: 25,
    marginRight: theme.spacing(1)
  },
  topIgnitesBar: {
    display: "flex",
    height: 8,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: theme.spacing(2)
  },
  topIgnitesLegend: {
    marginTop: theme.spacing(2),
    display: "flex"
  },
  topIgnitesLegendIcon: {
    width: 10,
    height: 10,
    overflow: "hidden",
    borderRadius: "50%",
    marginRight: 4
  },
  topIgnitesLegendItem: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 400,
    marginRight: theme.spacing(2)
  }
}));

type SparkOnProps = {
  spark: Spark;
  onClick(spark: Spark): void;
};

const colors = ["#FFD796", "#71739E", "#C1ECF4", "#6CC6F9", "#C4C4C4"];

const SparkOnItem = ({ spark, onClick }: SparkOnProps) => {
  const classes = useStyles();

  const handleSparkClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick(spark);
  };

  const ignites = spark.ignites || [];

  return (
    <div className={classes.content} onClick={handleSparkClick}>
      <div>
        <CircleImage className={classes.sparkImageContainer} imageUrl={spark.backgroundImage} />
      </div>
      <div>
        <div className={classes.title}>{spark.title}</div>
        <div className={classes.stats}>
          <SparkIcon className={classes.sparkIcon} />
          <span>{spark.children?.length}</span>
          <IgniteIcon viewBox="0 0 18 18" className={classes.igniteIcon} />
          <span>{spark.ignites?.length}</span>
          <span>&#183;</span>
          <span>{spark.member.membername}</span>
          <span>&#183;</span>
          <span>{formatDistance(new Date(spark.updatedDatetime), new Date())}</span>
        </div>
        <div className={classes.description}>{spark.description}</div>
        <div className={classes.topParticipants}>
          <div className={classes.topParticipantsHeader}>Top participants</div>
          <div className={classes.topParticipantsIcons}>
            {spark.topParticipants?.map((p) => (
              <CircleImage key={p.id} className={classes.topParticipantsImages} imageUrl={p.profilePictureUrl || ""} />
            ))}
          </div>
        </div>
        <div className={classes.topIgnites}>
          <div className={classes.topIgnitesHeader}>Top Ignites</div>
          <div className={classes.topIgnitesBar}>
            {spark.topIgnites?.map((g, i) => {
              const percentage = (g.usageCount / ignites.length) * 100 + "%";
              return (
                <div
                  key={`bar_${g.id}_${g.usageCount}`}
                  style={{ width: percentage, backgroundColor: colors[i] }}
                ></div>
              );
            })}
          </div>
          <div className={classes.topIgnitesLegend}>
            {spark.topIgnites?.map((g, i) => {
              return (
                <div key={`leg_${g.id}_${g.usageCount}`} className={classes.topIgnitesLegendItem}>
                  <div className={classes.topIgnitesLegendIcon} style={{ backgroundColor: colors[i] }}></div>
                  <div>{g.id}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SparkOnItem);
