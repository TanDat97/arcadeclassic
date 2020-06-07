import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux'
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar"
import "perfect-scrollbar/css/perfect-scrollbar.css"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// core components
import Navbar from "components/common/Navbars/Navbar"
import Sidebar from "components/common/Sidebar/Sidebar"
import Footer from "components/common/Footer/Footer"
import FixedPlugin from "components/common/FixedPlugin/FixedPlugin"
import Admin404 from "views/admin/Admin404"

import { accountAction } from '_actions'

import routes from "./routes"

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle"
import bgImage from "assets/img/sidebar-2.jpg"
import logo from "assets/img/reactlogo.png"

let ps

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path="/admin/*" component={Admin404} />
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

function Admin( props, { ...rest }) {
  // styles
  const classes = useStyles()
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef()
  // states and functions
  const [image, setImage] = React.useState(bgImage)
  const [color, setColor] = React.useState("blue")
  const [fixedClasses, setFixedClasses] = React.useState("dropdown")
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleImageClick = image => {
    setImage(image)
  };
  const handleColorClick = color => {
    setColor(color)
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown")
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          color={color}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: () => dispatch(accountAction.getInfoUserRequest()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(Admin)