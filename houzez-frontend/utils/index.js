import { defaultLanguage } from "@constant"
import { dialogCreate } from "@actions/dialog"
import { saveUser } from "@actions/user"

export const numberFormat = function (value, n, x) {
  const re = "(\\d)(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")"
  return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$1,")
}

export const getLanguage = function () {
  if (typeof window !== "undefined") {
    const lang = window.localStorage.getItem("hz_lang")
    return lang !== null ? JSON.parse(lang) : defaultLanguage
  }
  return defaultLanguage
}

export const setLanguage = function (language) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("hz_lang", JSON.stringify(language))
  }
}

export const isEmail = function (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const loadScriptAsync = async (src, scriptId) => {
  const script = document.createElement("script")
  if (scriptId) {
    const scriptElement = document.getElementById(scriptId)
    if (scriptElement) scriptElement.remove()
    script.id = scriptId
  }
  script.src = src
  return new Promise((resolve, reject) => {
    script.onreadystatechange = script.onload = function () {
      resolve(true)
    }
    document.getElementsByTagName("head")[0].appendChild(script)
  })
}

export const isURL = (string) => {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}

export const getSingleContentByLanguage = (data, languageKey) => {
  if (!data.length) return []
  let flag = []
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    if (element.language === languageKey) {
      flag = [element]
      break
    }
  }
  return flag
}

export const getMultiContentByLanguage = (data, languageKey) => {
  if (!data?.length) return []
  let flag = []
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    if (element.language === languageKey) {
      flag.push(element)
    }
  }
  return flag
}

export const getCurrentDate = () => {
  const today = new Date()
  let month = today.getMonth() + 1
  month = month < 10 ? "0" + month : month
  let date = today.getDate()
  date = date < 10 ? "0" + date : date
  return today.getFullYear() + "-" + month + "-" + date
}

export const set24hrTo12hr = (time) => {
  if (!time) return ""
  time = time.split(":")
  const AmOrPm = time[0] >= 12 ? "pm" : "am"
  const hours = time[0] % 12 || 12
  return hours + ":" + time[1] + " " + AmOrPm
}

export const arrayUnique = (myArray) =>
  myArray.filter((v, i, a) => a.indexOf(v) === i)

export const arraySort = (myArray, key = "price", orderBy = "desc") => {
  return myArray.sort((a, b) => {
    if (orderBy === "desc") return parseFloat(a[key]) - parseFloat(b[key])
    return parseFloat(b[key]) - parseFloat(a[key])
  })
}

export const setDynamicTitle = (title) => {
  if (typeof window !== "undefined" && title) {
    const mobileTitle = document.getElementById("dynamic-title-id")
    if (mobileTitle) mobileTitle.innerHTML = title
  }
}

export const exploreMenuById = (id) => {
  document.documentElement.scrollTop = 0
  const element = document.getElementById(id)
  element && element.click()
}

export const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}

export const getOrigin = () => {
  return window && location ? location.protocol + "//" + location.host : ""
}

export const windowScrollToBottom = () => {
  if (window && document) {
    return (
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    )
  }
}

export const singleFilter = (data, key, value) => {
  for (let i = 0; i < data.length; i++) {
    const e = data[i]
    if (e[key] === value) return e
  }
  return {}
}

export const formatPrice = (money) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(money)
}

export const isArrayContainString = (array, string) => {
  if (array?.length && array[array.indexOf(string)]) {
    return true
  }
  return false
}

export const getInitDataFilter = (data) => {
  let result = []
  if (data) {
    result = JSON.parse(JSON.stringify(data))
    result.unshift({ uuid: null, name: null })
  }
  return result
}

export const buildQuery = ({
  type_business,
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
  status,
  page,
  sort,
}) => {
  let query = ""
  if (type_business && type_business != "all") {
    query += `&type_business=${type_business}`
  }
  if (district_uuid) {
    query += `&district_uuid=${district_uuid}`
  }
  if (project_uuid) {
    query += `&project_uuid=${project_uuid}`
  }
  if (type_uuid) {
    query += `&type_uuid=${type_uuid}`
  }
  if (bedroom) {
    query += `&bedroom=${bedroom}`
  }
  if (area_from) {
    query += `&area_from=${area_from}`
  }
  if (area_to) {
    query += `&area_to=${area_to}`
  }
  if (price_from) {
    query += `&price_from=${price_from}`
  }
  if (price_to) {
    query += `&price_to=${price_to}`
  }
  if (furniture) {
    query += `&furniture=${furniture}`
  }
  if (bathroom) {
    query += `&bathroom=${bathroom}`
  }
  if (status) {
    query += `&status=${status}`
  }
  if (page) {
    query += `&page=${page}`
  }
  if (sort) {
    query += `&sort=${sort}`
  }
  query = query.slice(1)
  return query
}
