import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { PAGES } from "../../constants/page";
import { RootState } from "../../store/index";

const AuthorizationWrapper = ({ children }: { children: JSX.Element }) => {
  const authState = useSelector((state: RootState) => state.auth);

  const isAuthorized = !!authState.token;

  return isAuthorized ? children : <Navigate to={PAGES.LOGIN} replace />;
};

export default AuthorizationWrapper;
