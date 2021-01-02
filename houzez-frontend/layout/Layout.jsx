import React, { useEffect } from "react"
import Router from "next/router"
import Head from "next/head"
import getConfig from "next/config"
import { useDispatch, useSelector } from "react-redux"

import { getLanguage, loadScriptAsync } from "@utils"
import { getAllDataFilter } from "@actions/home"
import { saveSystemLanguage } from "@actions/user"
// import AlertDialog from "@components/alertDialog"
// import Notification from "@components/notification"

import Header from "./Header"
// import NavBar from "./NavBar"
import Footer from "./Footer"

import ContactInfo from "@components/ContactInfo"

const { publicRuntimeConfig } = getConfig()
const MainLayout = (props) => {
  const { route = "", query = {}, asPath } = Router.router || {}

  const {
    pageTitle,
    pageDescription,
    withoutNavBar,
    customMobileHeader,
    headerTransparent,
    withoutMobileHeader,
    withoutDesktopHeader,
    withoutDesktopFooter,
    children,
  } = props
  const currentLang = getLanguage()

  const dispatch = useDispatch()
  const userCurrency = useSelector((state) => state.user.userCurrency)

  useEffect(() => {
    dispatch(saveSystemLanguage(currentLang))
    dispatch(getAllDataFilter())
  }, [])

//   useEffect(() => {
//     if (window) window.scrollTo(0, 0)
//   }, [route])

//   useEffect(() => {
//     if (agentId) {
//       dispatch(saveAgentId(agentId))
//     }
//   }, [agentId])

//   useEffect(() => {
//     const { data, ssoTracking } = userInfo
//     if (ssoTracking) {
//       const { traffic } = query
//       TagManager.pushLayer({
//         customerID: data ? data.navitaireCustomerNumber : "",
//         loginstatus: data ? "loggedIn" : "non-loggedIn",
//         pagename: GTMPageName(route, asPath),
//         GAClientID: data ? data.gaClientId : "",
//         trafficsource: GTMGetTraffic(traffic),
//         SSOiD: data ? data.id : "",
//         currency: userCurrency ? userCurrency.code : "",
//         language: data ? data.cultureCode : "",
//       })
//     }
//   }, [route, userInfo])

//   const successCallback = async (data) => {
//     try {
//       // Get User info
//       const [config, userInfo] = await Promise.all([
//         aaWidget.config(),
//         aaWidget.getUser(),
//       ])
//       userInfo.apiKey = config.apiKey
//       userInfo.accessToken = data.accessToken
//       userInfo.refreshToken = data.refreshToken
//       dispatch(saveUser({ userInfo, ssoTracking: true }))
//     } catch (error) {
//       console.log("Initialization Get User info ERROR:", error)
//     }
//   }

//   const failureFunction = (error) => {
//     console.log("Failure Initialization: ", error)
//     dispatch(saveUser({ userInfo: false, ssoTracking: true }))
//   }

  return (
    <div id="Layout" className="Layout">
      <Head>
        <title>{pageTitle || "Houzez - Apartment For Rent In HCMC"}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={pageDescription || "Apartment For Rent In HCMC"}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href={`${publicRuntimeConfig.basePathEnv}/favicon.ico`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>

      {/* Header */}
      <Header
        headerTransparent={headerTransparent}
        customMobileHeader={customMobileHeader}
        withoutMobileHeader={withoutMobileHeader}
        withoutDesktopHeader={withoutDesktopHeader}
      />
      {/* ./Header */}

      {/* Feedback element */}
      {/* <Notification />
      <AlertDialog /> */}
      {/* ./Feedback element */}

      {/* Main Content */}
      <main
        className={
          `main-content ${!withoutNavBar ? "isNavBar" : ""}` +
          `${!headerTransparent ? " spacing-top" : ""}`
        }
      >
        {children}
      </main>
      {/* ./Main Content */}

      <ContactInfo />

      <Footer
        className="lg:block"
        withoutDesktopFooter={withoutDesktopFooter}
      />
    </div>
  )
}

export default MainLayout
