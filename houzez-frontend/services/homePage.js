import axios from "axios"
import {
  hostV1,
  headers,
  successCode,
} from "@constant"
import { fetchData } from "./fetch"

export const servicesGetAllDataFilter = async () => {
  try {
    const res = await axios.get(`${hostV1}/project/data-filter`, {
      headers,
    })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetAllCurrency ERROR:", error)
    return {}
  }
}

export const servicesGetAllProduct = async (query) => {
  try {
    const res = await axios.get(`${hostV1}/product?${query}`, {
      headers,
    })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetAllData ERROR:", error)
    return {}
  }
}

export const servicesGetDetailProduct = async (slug) => {
  try {
    const res = await axios.get(`${hostV1}/product/${slug}`, {
      headers,
    })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetDetailData ERROR:", error)
    return {}
  }
}

export const servicesGetAllProject = async (query) => {
  try {
    const res = await axios.get(`${hostV1}/project?${query}`, {
      headers,
    })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetAllProject ERROR:", error)
    return {}
  }
}

export const servicesGetDetailProject = async (slug) => {
  try {
    const res = await axios.get(`${hostV1}/project/${slug}`, {
      headers,
    })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetDetailProject ERROR:", error)
    return {}
  }
}

export const servicesGetAllCurrency = async () => {
  try {
    const res = await axios.get(`${hostV1}/details?key=currency`, {
      headers,
    })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetAllCurrency ERROR:", error)
    return false
  }
}

export const servicesGetAllCountries = async () => {
  try {
    const res = await axios.get(`${hostV1}`)
    return res.data.countries
  } catch (error) {
    console.log("servicesGetAllCountries ERROR:", error)
    return false
  }
}
