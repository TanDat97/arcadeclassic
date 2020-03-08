// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import ListIcon from '@material-ui/icons/List';

// core components//admin for Admin layout
import AdminDashboard from "views/admin/AdminDashboard";
import PostList from "views/admin/post/PostList";

const adminDashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin"
  },
  {
    path: "/posts",
    name: "Posts",
    icon: ListIcon,
    component: PostList,
    layout: "/admin"
  },
]

export default adminDashboardRoutes;