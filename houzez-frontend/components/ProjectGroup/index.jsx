import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import Router from "next/router"
import Link from "next/link"

import ProjectItem from "@components/widget/ProjectItem"
import Empty from "@components/utils/Empty"

import "./index.scss"

import { servicesGetAllProject } from "@services/homePage"
import { getInitDataFilter, buildQuery } from "@utils"

const ProductGroup = (props) => {
  const { t, i18n } = useTranslation("common")

  const { status = "open_to_sale" } = props
  const title = t(`page.${status}`)

  const [init, setInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getAllProjectForGroup(status)
    setInit(true)
  }, [])

  const getAllProjectForGroup = async (status) => {
    setLoading(true)
    const query = `status=${status}`
    const projectData = await servicesGetAllProject(query)
    setProjects(projectData)
    setLoading(false)
  }

  const clickSeeAll = () => {
    Router.push(
      `/projects?status=${status ? status : "default"}`
    )
  }

  return (
    <section className="main-section list-project">
      <div className="container-houzez">
        <div className="project-section">
          <h2 className="houzez-title">{title}</h2>
          <span onClick={clickSeeAll} className="btn-link btn-see-all">
            {t("group.see_all")}
          </span>
          <div className="project-tab">
            <div className="project-wrap">
              <div className="project-list">
                {loading || !init ? (
                  <div className="project-change">
                    <div className="loader size-40"></div>
                  </div>
                )  : projects.total > 0 ? (
                  <div className="row">
                    {projects.items.map((e) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={e.uuid}>
                        <ProjectItem project={e} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="medium"/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductGroup
