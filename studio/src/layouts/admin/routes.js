// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import ListIcon from '@material-ui/icons/List'
import DetailsIcon from '@material-ui/icons/Details'

// core components//admin for Admin layout
import AdminDashboard from 'views/admin/AdminDashboard'
import PostList from 'views/admin/post/PostList'
import PostDetail from 'views/admin/post/PostDetail'

const adminDashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin",
    root: true,
  },
  {
    path: "/posts",
    name: "Posts",
    icon: ListIcon,
    component: PostList,
    layout: "/admin",
    root: true,
  },
  {
    path: "/postdetail",
    name: "Post Detail",
    icon: DetailsIcon,
    component: PostDetail,
    layout: "/admin",
    root: true,
  },
]

export default adminDashboardRoutes;