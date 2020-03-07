// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// core components//admin for Admin layout
import AdminDashboard from "views/admin/AdminDashboard";

const adminDashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin"
  },
]

export default adminDashboardRoutes;