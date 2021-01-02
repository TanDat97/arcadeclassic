import React from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import withRedux from "next-redux-wrapper"
import Router from "next/router"
import App from "next/app"
import getConfig from "next/config"

import { i18nInit } from "@config/i18n"
import { headTitle } from "@constant"
import store from "../redux/store"
import MainLayout from "@layout/Layout"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import "../styles/sass/style.scss"


const palette = {
  primary: {
    main: "#dc3224",
    light: "#fbebe9",
    dark: "#c92d21",
    contrastText: "#f0bab5",
  },
  secondary: {
    main: "#4b4fa6",
    dark: "#4448a0",
  },
  action: {
    selected: "#4b4fa6",
    // hover: "#F0BAB5",
  },
  text: {
    primary: "#dc3224",
    secondary: "#4b4fa6",
  },
  error: {
    main: "#dc3224",
  },
  divider: "#D9DBE0",
  common: {
    black: "#75767a",
    white: "f8f8f8",
  },
}

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 840,
      lg: 900,
      xl: 1200,
    },
  },
  palette,
  overrides: {},
})

const { publicRuntimeConfig } = getConfig()

function MyApp({ Component, pageProps }) {
  const Layout = Component.getLayout || MainLayout

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInit}>
        <ThemeProvider theme={theme}>
          <Layout
            pageTitle={
              Component.pageTitle
                ? `${Component.pageTitle} | ${headTitle}`
                : headTitle
            }
            customMobileHeader={Component.customMobileHeader}
            headerTransparent={Component.headerTransparent}
            withoutNavBar={Component.withoutNavBar}
            withoutMobileHeader={Component.withoutMobileHeader}
            withoutDesktopHeader={Component.withoutDesktopHeader}
            withoutDesktopFooter={Component.withoutDesktopFooter}
          >
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default MyApp
