import AvatarImg from "assets/avatar.png";
import { SparkComponent } from "components";
import { EmptySparkMap, SparkOnButton } from "components/reusable";
import React from "react";
import { useHistory } from "react-router-dom";
import type { Spark } from "types";

type Props = {
  sparks: Spark[];
  disableSparkonButton?: boolean;
};

const commonSparkStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24
};

const styles = {
  top: { gridArea: "top", ...commonSparkStyles },
  bottom: { gridArea: "bottom", ...commonSparkStyles },
  bottomRight: { gridArea: "bottomRight", ...commonSparkStyles },
  bottomLeft: { gridArea: "bottomLeft", ...commonSparkStyles },
  topLeft: { gridArea: "topLeft", ...commonSparkStyles },
  topRight: { gridArea: "topRight", ...commonSparkStyles },
  center: {
    gridArea: "center",
    ...commonSparkStyles,
    "&:before": {
      content: "attr(title)",
      position: "absolute",
      left: "-11px",
      top: "50%",
      transformOrigin: "top left",
      transform: "rotate(-90deg) translate(-50%)",
      fontSize: "15px",
      backgroundColor: "white",
      padding: "0 10px",
      border: "1px solid transparent"
    }
  }
};

const sparkPositions = ["center", "bottomRight", "bottom", "bottomLeft", "topLeft", "top", "topRight"];

const OrbitComponent = ({ sparks, disableSparkonButton = false }: Props) => {
  const history = useHistory();

  if (!sparks.length) {
    return (
      <div style={{ height: 400, width: 600 }}>
        <EmptySparkMap />
      </div>
    );
  }

  const sparksOnOrbit = sparks.slice(0, 7);
  const handleSparkOnClick = () => history.push(`/sparkmap/sparkon/${centralSpark.id}`);

  // TODO: update this logic to get Central spark separately or correctly
  const centralSpark = sparksOnOrbit[0];

  return (
    <React.Fragment>
      {sparksOnOrbit.map(
        ({ id, title, description, member, ignites, backgroundImage, sparkmap, children, updatedDatetime }, idx) => (
          <div
            key={id}
            style={{
              // TODO: Find better way to apply these styles
              // @ts-ignore
              ...styles[`${sparkPositions[idx]}`]
            }}
          >
            <SparkComponent
              sparkId={id}
              sparkmapId={sparkmap.id}
              sparkTitle={title}
              sparkDescription={description}
              // TODO: Replace `membername` with proper author name once that is available from API
              author={member.membername}
              ignitesCount={ignites?.length ?? 0}
              sparkonsCount={children?.length ?? 0}
              // TODO: Replace this placeholder avatar image with one received from API
              avatarSrc={AvatarImg}
              memberName={"some"}
              backgroundImageSrc={backgroundImage}
              updatedDatetime={updatedDatetime}
              additionalInfo={{
                isCentralSpark: idx === 0,
                totalConnectors: sparksOnOrbit.length
              }}
            />
          </div>
        )
      )}

      {!disableSparkonButton && (
        <>
          {sparksOnOrbit.length < 7 && (
            <div style={{ ...styles.topRight }}>
              <SparkOnButton onSparkOnClick={handleSparkOnClick} />
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default OrbitComponent;
