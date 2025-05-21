import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC<{ allowedPermissions: string[] }> = ({ allowedPermissions }) => {
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');

  if (!adminUser || !adminUser.role) {
    return <Navigate to="/login" replace />;
  }

  if (adminUser.role === 'ADMIN') {
    return <Outlet />;
  }

  const hasPermission = allowedPermissions.some((perm) => {
    const [menu, subMenu] = perm.split('.');
    return permissions[menu]?.includes(subMenu);
  });

  if (!hasPermission) {
    return <Navigate to="/admin/admindashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;