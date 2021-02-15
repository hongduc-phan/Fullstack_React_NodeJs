import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

export default function SparkOnIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#fff"
        d="M21.429 6.571H18.57V9.43A.573.573 0 0118 10a.573.573 0 01-.571-.571V6.57H14.57A.573.573 0 0114 6c0-.314.257-.571.571-.571h2.858V2.57c0-.314.257-.571.571-.571.314 0 .571.257.571.571v2.86h2.858c.314 0 .571.257.571.571a.573.573 0 01-.571.571z"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M10.75 7.25a.75.75 0 00-1.5 0v4.94L5.757 8.696a.75.75 0 00-1.06 1.06l3.492 3.493H3.25a.75.75 0 000 1.5h4.94l-3.493 3.493a.75.75 0 001.06 1.06L9.25 15.81v4.939a.75.75 0 001.5 0v-4.94l3.493 3.493a.75.75 0 001.06-1.06l-3.492-3.493h4.939a.75.75 0 000-1.5h-4.94l3.493-3.493a.75.75 0 10-1.06-1.06l-3.493 3.492V7.25z"
        clipRule="evenodd"
      ></path>
    </SvgIcon>
  );
}
