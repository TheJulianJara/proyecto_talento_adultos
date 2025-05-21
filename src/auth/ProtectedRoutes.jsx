"use client"

import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AuthContext } from "../App"

export default function ProtectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()

  // If not authenticated, redirect to login page with the current location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
}
