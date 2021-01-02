import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import Router, { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import { getAllProduct } from "@actions/home"

import Hidden from "@material-ui/core/Hidden"

import DropdownMenu from "@components/widget/DropdownMenu"
import SelectTop from "@components/widget/SelectTop"
import SelectTypeBusiness from "@components/DropdownInfo/SelectTypeBusiness"
import ButtonIcon from "@components/utils/ButtonIcon"
import { ReactComponent as SearchIcon } from "@assets/images/icons/search.svg"
import "./index.scss"

import { getInitDataFilter, buildQuery } from "@utils"

const SearchTop = (props) => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    district_uuid,
    project_uuid,
    type_uuid,
    bedroom,
    area_from,
    area_to,
    price_from,
    price_to,
    furniture,
    bathroom,
    page,
    sort,
  } = router.query

  const [init, setInit] = useState(true)
  const [fetch, setFetch] = useState(false)
  const [typeBusiness, setTypeBusiness] = useState("")
  const [district, setDistrict] = useState({})
  const [project, setProject] = useState({})
  const [type, setType] = useState({})
  const [bedRoom, setBedRoom] = useState({})

  const dataFilter = useSelector((state) => state.home.dataFilter)
  const districts = getInitDataFilter(dataFilter.origins)
  const projects = getInitDataFilter(dataFilter.projects)
  const types = getInitDataFilter(dataFilter.types)
  const rooms = getInitDataFilter(dataFilter.types)

  useEffect(() => {
    if (
      router.pathname == "/for-all" ||
      router.pathname == "/for-sale" ||
      router.pathname == "/for-rent"
    ) {
      setTypeBusiness(router.pathname.slice(5))
    } else {
      setTypeBusiness("all")
    }
  }, [])

  useEffect(() => {
    if (district_uuid && districts && districts.length > 0) {
      const temp = districts.find((e) => e.uuid === district_uuid) || {}
      setDistrict(temp)
    }
  }, [district_uuid, districts.length])

  useEffect(() => {
    if (project_uuid && projects && projects.length > 0) {
      const temp = projects.find((e) => e.uuid === project_uuid) || {}
      setProject(temp)
    }
  }, [project_uuid, projects.length])

  useEffect(() => {
    if (type_uuid && types && types.length > 0) {
      const temp = types.find((e) => e.uuid === type_uuid) || {}
      setType(temp)
    }
  }, [type_uuid, types.length])

  useEffect(() => {
    if (district_uuid || project_uuid || type_uuid) {
      onSearch()
    } else if (init) {
      setInit(false)
    } else if (!init) {
      onSearch()
    }
  }, [
    district_uuid,
    project_uuid,
    type_uuid,
    bedroom,
    area_from,
    area_to,
    price_from,
    price_to,
    furniture,
    bathroom,
  ])

  useEffect(() => {
    if (
      !init &&
      (router.pathname === "/for-all" ||
        router.pathname === "/for-sale" ||
        router.pathname === "/for-rent")
    ) {
      onSearch()
    }
  }, [init, page, sort])

  useEffect(() => {
    if (!init || fetch) {
      const query = buildQuery({
        district_uuid: district.uuid,
        project_uuid: project.uuid,
        type_uuid: type.uuid,
      })
      Router.push(`/for-${typeBusiness}?${query}`)
    }
    setFetch(false)
  }, [district, project, type])

  const onSearch = () => {
    if (router.pathname.indexOf(typeBusiness) > -1) {
      const query = buildQuery({
        ...router.query,
        type_business: typeBusiness,
      })
      console.log("dispatch", query)
      dispatch(getAllProduct(query))
    } else {
      const query = buildQuery(router.query)
      Router.push(`/for-${typeBusiness}?${query}`)
    }
  }

  return (
    <div className="top-search">
      <div className="top-search-wrap">
        <div className="main-form">
          <div className="form-group-top form-search-box">
            <div className="form-select">
              <DropdownMenu
                className="select-type handle-overflow"
                options={
                  <SelectTypeBusiness
                    desktop={true}
                    handleChange={(e) => setTypeBusiness(e)}
                  />
                }
              >
                <span id="select-type">
                  {typeBusiness === "rent"
                    ? t("search.rent")
                    : typeBusiness === "sale"
                    ? t("search.sale")
                    : t("search.all")}
                </span>
              </DropdownMenu>
            </div>
            <div className="form-search">
              <input
                className="form-control"
                id="top-search-input"
                type="text"
                autoComplete="off"
                placeholder={t("search.placeholder_search")}
              />
              <ButtonIcon>
                <SearchIcon />
              </ButtonIcon>
            </div>
          </div>

          {/* Select Desktop */}
          <SelectTop
            state={district}
            data={districts}
            handleChange={(e) => {
              setDistrict(e)
              setFetch(true)
            }}
            textTranslate={t("search.select_district")}
          />
          <SelectTop
            state={project}
            data={projects}
            handleChange={(e) => {
              setProject(e)
              setFetch(true)
            }}
            textTranslate={t("search.select_project")}
          />
          <SelectTop
            state={type}
            data={types}
            handleChange={(e) => {
              setType(e)
              setFetch(true)
            }}
            textTranslate={t("search.select_type")}
          />
          <SelectTop
            state={bedRoom}
            data={rooms}
            handleChange={(e) => setBedRoom(e)}
            textTranslate={t("search.select_room")}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchTop
