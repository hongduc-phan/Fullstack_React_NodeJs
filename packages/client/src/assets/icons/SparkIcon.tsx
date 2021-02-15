import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

function SparkIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 -2 16 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 1.25a.75.75 0 00-1.5 0v4.94L3.757 2.696a.75.75 0 00-1.06 1.06L6.189 7.25H1.25a.75.75 0 000 1.5h4.94l-3.493 3.493a.75.75 0 001.06 1.06L7.25 9.811v4.939a.75.75 0 001.5 0V9.81l3.493 3.493a.75.75 0 001.06-1.06L9.811 8.75h4.939a.75.75 0 000-1.5H9.81l3.493-3.493a.75.75 0 10-1.06-1.06L8.75 6.189V1.25z"
      />
    </SvgIcon>
  );
}

export default React.memo(SparkIcon);
