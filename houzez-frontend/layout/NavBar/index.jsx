import BottomMenu from "@airasia/phoenix-widgets/widgets/BottomMenu"
import getConfig from "next/config"
import Router from "next/router"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import "./index.scss"

const NavBar = styled.div`
  > div {
    > div:nth-child(${({ active }) => active}) {
      img {
        filter: invert(49%) sepia(78%) saturate(6470%) hue-rotate(345deg)
          brightness(87%) contrast(99%);
      }

      p {
        color: #dc3224;
      }
    }
  }
`

const likeActiveRoute = (asPath) => {
  switch (asPath) {
    case "/":
      return 1
    case "/my-account":
      return 2
    case "/search":
      return 3
    case "/enquiry":
      return 4
    default:
      return 5
  }
}

const { publicRuntimeConfig } = getConfig()
const NarBar = () => {
  const { t, i18n } = useTranslation("common")
  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
  }, [])

  const { asPath = "" } = Router.router || {}

  return (
    load && (
      <NavBar className="NavBar lg:hidden" active={likeActiveRoute(asPath)}>
        <BottomMenu
          accessible
          background="default"
          data={[
            {
              icon: publicRuntimeConfig.basePathEnv + "/images/home.svg",
              text: t("home"),
              onClick: () => {
                Router.push("/")
              },
            },
            {
              icon: publicRuntimeConfig.basePathEnv + "/images/person.svg",
              text: t("account"),
              onClick: () => {
                Router.push("/my-account")
              },
            },
            {
              icon: publicRuntimeConfig.basePathEnv + "/images/search.svg",
              text: t("treatment"),
              onClick: () => {
                Router.push("/search")
              },
            },
            {
              icon:
                publicRuntimeConfig.basePathEnv +
                "/images/contact_support_24px.svg",
              text: t("ask_us"),
              onClick: () => {
                Router.push("/enquiry")
              },
            },
            {
              icon: publicRuntimeConfig.basePathEnv + "/images/menu.svg",
              text: t("menu"),
              onClick: () => {
                Router.push("/menu")
              },
            },
          ]}
          textColor="neutral"
          theme="AIRASIA_CLASSIC"
        />
      </NavBar>
    )
  )
}

export default NarBar
