//page(u1)access on the basis of roles
import React from 'react';
import { Navigate } from 'react-router-dom';
//children: the content you want to protect (like a page or component).

//allowedRoles: a list (array) of roles allowed to see this content.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
//"If there's a list of allowed roles, and the user's role is not in that list, then don't allow access."
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect based on role

    //suppose allowedroles['custmer'] for this page suppose  userle =shopkeeper can access  so go to shopkeeper dashboard
    if (userRole === 'customer') {
      return <Navigate to="/shopsearch" replace />;
    } else if (userRole === 'shopkeeper') {
      return <Navigate to="/dashboard/home" replace />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
