import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

export default function MinimizeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M4.713 11.09c0-.51.41-.911.91-.911h3.27l-5.627-5.63A.907.907 0 114.55 3.267l5.626 5.63v-3.27c0-.5.41-.91.91-.91.501 0 .911.41.911.91v5.463c0 .501-.41.91-.91.91H5.624c-.5 0-.91-.409-.91-.91zM19.388 12.91c0 .51-.41.91-.91.91h-3.269l5.627 5.63a.907.907 0 11-1.284 1.284l-5.626-5.63v3.27c0 .5-.41.91-.91.91-.502 0-.911-.41-.911-.91V12.91c0-.5.41-.91.91-.91h5.463c.5 0 .91.41.91.91z"
        fill="#000"
        fillOpacity=".54"
      />
    </SvgIcon>
  );
}
