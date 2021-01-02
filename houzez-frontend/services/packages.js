import axios from 'axios'
import {
  menuV1,
  cartV1,
  successCode,
  headers,
  covid19CategoryUUID,
} from "@constant"
import { fetchData } from './fetch'

export const servicesGetAllAppointmentTimeByDate = (item) => fetchData({
    method: 'get',
    url: `${menuV1}/variants`
}, item)

export const servicesGetAllAppointmentDate = (item) => fetchData({
    method: 'get',
    url: `${menuV1}/variant-groups`
}, item)

export const servicesGetAllDoctors = (item) => fetchData({
    method: 'get',
    url: `${menuV1}/doctors`
}, item)

export const servicesGetProductsSimpleByCategory = async (search) => {
    try {
        const params = { type_id: 1, ...search }
        const res = await axios.get(`${menuV1}/packages`, { headers, params })
        const data = res.data;
        if (data.code === successCode) return data.data
        throw data.message;
    } catch (error) {
        console.log('servicesGetProductsSimpleByCategory ERROR:', error)
        return false;
    }
}

export const servicesProductSimpleDetail = async (productId) => {
    try {
        const params = { type_id: 1 }
        const res = await axios.get(`${menuV1}/packages/${productId}`, { headers, params })
        const data = res.data;
        if (data.code === successCode) return data.data
        throw data.message;
    } catch (error) {
        console.log('servicesProductSimpleDetail ERROR:', error)
        return false;
    }
}

export const getCurrencyTransfer = async (currency) => fetchData({
    method: 'get',
    url: `${cartV1}/conversion-rate/code/${currency}`
})

export const servicesGetAllDoctorsByCategory = async (item) => {
  const data = await fetchData(
    {
      method: "get",
      url: `${menuV1}/doctors-group-by-category`,
    },
    item
  )
  return data?.filter((category) => category.uuid !== covid19CategoryUUID)
}

export const servicesGetAirAsiaAssistPackages = async (search) => {
  try {
    const params = { type_id: 1, additional_type_id: 2, ...search }
    const res = await axios.get(`${menuV1}/packages`, { headers, params })
    const data = res.data
    if (data.code === successCode) return data.data
    throw data.message
  } catch (error) {
    console.log("servicesGetAirAsiaAssistPackages ERROR:", error)
    return false
  }
}
