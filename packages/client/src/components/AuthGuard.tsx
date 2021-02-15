import { useAuthStore } from "contexts/AuthContext";
import React, { ReactNode } from "react";
import { Redirect } from "react-router-dom";

type Props = {
  children: ReactNode;
  restrictFirstLogin?: boolean;
};

const AuthGuard = ({ children, restrictFirstLogin = true }: Props) => {
  const { isAuthenticated, isFirstLogin } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect to="/auth/login" />;
  }

  if (isAuthenticated && restrictFirstLogin && isFirstLogin) {
    return <Redirect to="/profile-setup" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
