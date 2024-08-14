// AdminDashboard.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <nav className="mb-6">
        <Link to="users" className="mr-4 text-blue-500">
          Users
        </Link>
        <Link to="carts" className="mr-4 text-blue-500">
          Carts
        </Link>
        <Link to="products" className="text-blue-500">
          Products
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
