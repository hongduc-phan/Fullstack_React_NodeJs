import { MenuItem } from "@material-ui/core";
import { Omit } from "@material-ui/types";
import React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

type MenuItemLinkProps = {
  onClick?: () => void;
  to: string;
  children: React.ReactNode;
};

export default function MenuItemLink(props: MenuItemLinkProps) {
  const { to, onClick, children } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <MenuItem button component={renderLink} onClick={Boolean(onClick) ? onClick : () => {}}>
      {children}
    </MenuItem>
  );
}
