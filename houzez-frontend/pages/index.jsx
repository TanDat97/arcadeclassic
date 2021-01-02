import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import getConfig from "next/config"

import SearchBar from "@components/SearchBar"
import ProductGroup from "@components/ProductGroup"
import ProjectGroup from "@components/ProjectGroup"
import Partners from "@components/Partners"

import "./index.scss"

const { publicRuntimeConfig } = getConfig()
const Home = () => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()

  return (
    <div>
      <section className="home-banner">
        <div className="banner-wrapper">
          <div className="img-container">
            <div className="image banner-pc ph-picture">
              <img src="/images/banner1.jpg" alt="banner-one" />
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      <ProductGroup type_business={"rent"} />
      <ProductGroup type_business={"sale"} />
      <ProjectGroup status={"open_to_sale"} />
      <ProjectGroup status={"ready_to_move"} />
      <Partners />
    </div>
  )
}

Home.headerTransparent = true
export default Home
