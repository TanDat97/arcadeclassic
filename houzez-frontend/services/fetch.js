import axios from "axios"
import { successCode, headers } from "@constant"

export const fetchData = async ({ method, url }, data) => {
  try {
    const config = { method, url }
    if (method === "get" || method === "GET") {
      config.params = data
    } else {
      config.data = data
    }
    config.headers = headers
    const res = await axios(config)
    const result = res.data
    if (result.code === successCode) return result.data || true
    throw result.message
  } catch (error) {
    const response = error.response || {}
    const errorInfo = response.data || {}
    console.log(url + " ERROR:", errorInfo.message || error.message)
    return false
  }
}
