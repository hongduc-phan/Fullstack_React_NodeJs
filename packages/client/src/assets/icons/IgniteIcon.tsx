import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

function IgniteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        d="M4.903.67A.682.682 0 015.57.536c1.295.432 2.697 1.602 3.768 3.273 1.08 1.687 1.858 3.934 1.858 6.588 0 2.956-2.148 5.104-5.104 5.104C2.754 15.5.25 12.823.25 9.658c0-1.182.197-2.006.417-2.556a3.38 3.38 0 01.32-.62 2.087 2.087 0 01.186-.24l.008-.008.003-.003.001-.002h.001l.483.481-.482-.482a.68.68 0 01.86-.085c1.122.748 1.692 1 2.19.991.223-.004.365-.06.465-.13a.905.905 0 00.29-.375c.182-.391.258-.985.24-1.708-.03-1.207-.31-2.504-.47-3.249-.03-.14-.057-.26-.076-.356A.682.682 0 014.903.67zM1.908 7.676c-.142.38-.294 1.014-.294 1.983 0 2.438 1.918 4.478 4.478 4.478 2.203 0 3.74-1.537 3.74-3.74 0-2.384-.697-4.376-1.643-5.852-.578-.904-1.239-1.596-1.873-2.07.132.715.259 1.583.28 2.413.02.788-.052 1.638-.369 2.318a2.26 2.26 0 01-.744.917c-.347.242-.76.367-1.222.375-.787.015-1.526-.314-2.353-.822z"
        clipRule="evenodd"
      ></path>
    </SvgIcon>
  );
}

IgniteIcon.defaultProps = {
  fill: "rgba(0, 0, 0, 0.6)"
};

export default React.memo(IgniteIcon);