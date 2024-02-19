// PrivateRoute.tsx
import { Navigate, Route } from 'react-router-dom';
import { Permissions } from '@config/permission'; // Adjust the import path

type PrivateRouteProps = {
  requiredPermission: string;
}

export default function PrivateRoute({ requiredPermission, ...rest }: PrivateRouteProps) {
  const userPermissions = [Permissions.ADMIN, Permissions.USER];

  if (!userPermissions.includes(requiredPermission)) {
    return <Navigate to="/forbidden" />;
  }

  return <Route {...rest} />;
}