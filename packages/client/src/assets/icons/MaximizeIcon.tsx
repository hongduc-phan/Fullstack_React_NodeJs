import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

export default function MaximizeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.335 14.972l2.728 2.725v-5.415c0-.533.436-.968.968-.968.533 0 .969.435.969.968v7.75a.971.971 0 01-.969.968h-7.749a.972.972 0 01-.969-.968c0-.533.436-.97.97-.97h5.414L7.663 9.03 4.935 6.303v5.415a.971.971 0 01-.969.969.971.971 0 01-.968-.969v-7.75c0-.532.436-.968.968-.968h7.75c.532 0 .968.436.968.969a.971.971 0 01-.968.969H6.3l10.034 10.034z"
      />
    </SvgIcon>
  );
}
