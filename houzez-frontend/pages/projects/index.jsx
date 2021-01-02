import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Router, { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import { getAllProject } from "@actions/home"

import { Pagination } from "@material-ui/lab"

import SearchTop from "@components/SearchTop"
import DropdownMenu from "@components/widget/DropdownMenu"
import SelectSort from "@components/DropdownInfo/SelectSort"
import SelectStatus from "@components/DropdownInfo/SelectStatus"
import ProjectItem from "@components/widget/ProjectItem"
import Empty from "@components/utils/Empty"

import "./index.scss"

import { buildQuery } from "@utils"

const Projects = () => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()
  const router = useRouter()
  const dataSort = [
    {
      key: "default",
      value: "default",
      name: t("search.default"),
    },
    {
      key: "newest",
      value: "-created_at",
      name: t("search.newest"),
    },
    {
      key: "oldest",
      value: "created_at",
      name: t("search.oldest"),
    },
  ]
  const dataStatus = [
    {
      key: "default",
      value: "default",
      name: t("search.default"),
    },
    {
      key: "open_to_sale",
      value: "open_to_sale",
      name: t("page.open_to_sale"),
    },
    {
      key: "ready_to_move",
      value: "ready_to_move",
      name: t("page.ready_to_move"),
    },
  ]

  const projectData = useSelector((state) => state.home.projectData)
  const isLoading = useSelector((state) => state.home.isLoading)

  const { status = "default", page = 1, sort = "default" } = router.query

  useEffect(() => {
    const query = buildQuery({status, page, sort})
    dispatch(getAllProject(query))
  }, [status, page, sort])


  const onChangeConfig = (statusSearch, pageSearch, sortSearch) => {
    const query = buildQuery({
      ...router.query,
      status: statusSearch,
      page: parseInt(pageSearch),
      sort: sortSearch,
    })
    Router.push(`${router.pathname}?${query}`)
    window.scrollTo(0, 0)
  }

  const handleChangePage = (e, selectPage) => {
    onChangeConfig(status, selectPage, sort)
  }

  const getCurrentTitle = (data, value) => {
    const cur = data.find((e) => e.value === value)
    return cur ? cur.name : t("search.default")
  }

  return (
    <div>
      <SearchTop />
      <section className="main-section page-apartment">
        <div className="container-houzez">
          <div className="apartment-section">
            <div className="apartment-head">
              <div className="head-left">
                <h2 className="title">{t("header.project")}</h2>
                <div className="apartment-number">
                  <p>
                    <span>{projectData.total} {t("header.project")}</span>
                  </p>
                </div>
              </div>
              <div className="head-right">
                <DropdownMenu
                  className="select-sort select-status handle-overflow"
                  options={
                    <SelectStatus
                      desktop={true}
                      handleChange={(e) => {
                        onChangeConfig(e, page, sort)
                      }}
                      data={dataStatus}
                    />
                  }
                >
                  <span id="select-sort">{getCurrentTitle(dataStatus, status)}</span>
                </DropdownMenu>
                <DropdownMenu
                  className="select-sort handle-overflow"
                  options={
                    <SelectSort
                      desktop={true}
                      handleChange={(e) => {
                        onChangeConfig(status, page, e)
                      }}
                      data={dataSort}
                    />
                  }
                >
                  <span id="select-sort">{getCurrentTitle(dataSort, sort)}</span>
                </DropdownMenu>
              </div>
            </div>
            <div className="apartment-wrap">
              <div className="apartment-page">
                {isLoading ? (
                  <div className="project-change">
                    <div className="loader size-40"></div>
                  </div>
                )  : projectData.total > 0 ? (
                  <div className="row">
                    {projectData.items.map((e) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={e.uuid}>
                        <ProjectItem project={e} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="medium"/>
                )}
              </div>
              <div className="apartment-pagination">
                <Pagination
                  count={projectData.pages || 0}
                  page={parseInt(page)}
                  onChange={handleChangePage}
                  variant="outlined"
                  color="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

Projects.pageTitle = "Projects"
export default Projects
