import { Navigate, useLocation } from "react-router-dom";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export const ProtectedRoute = ({ children }: Props) => {
  const pathname = useLocation().pathname;
  const isLogin = true;

  if (!isLogin) return <Navigate to="/login" />;
  if (pathname === "/") return <Navigate to="/home" />;

  return children;
};
