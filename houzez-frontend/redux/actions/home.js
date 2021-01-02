import {
  servicesGetAllCurrency,
  servicesGetAllDataFilter,
  servicesGetAllProduct,
  servicesGetAllProject,
} from "@services/homePage"
import { servicesSetCacheSearchValue } from "@services/localforage"
import { defaultCurrency } from "@constant"
import { saveUserCurrency } from "@actions/user"

//Action Types
export const GET_ALL_CURRENCY = "GET_ALL_CURRENCY"
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE"
export const GET_ALL_DATA_FILTER = "GET_ALL_DATA_FILTER"
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT"
export const GET_ALL_PROJECT = "GET_ALL_PROJECT"
export const SET_LOADING_PRODUCT = "SET_LOADING_PRODUCT"

//Action Creator
export const getAllCurrency = () => {
  return async (dispatch) => {
    const data = await servicesGetAllCurrency()
    const currency = data ? (data.currency ? data.currency : []) : []
    const defaultC = currency.filter((e) => e.code === defaultCurrency.code)
    dispatch(saveUserCurrency(defaultC.length ? defaultC[0] : []))
    const action = {
      type: GET_ALL_CURRENCY,
      payload: {
        currencyData: data ? (data.currency ? data.currency : []) : [],
      },
    }
    await dispatch(action)
  }
}

export const setSearchValue = (data, key = 'cacheSearchValue') => {
  servicesSetCacheSearchValue(data, key)
  return {
    type: SET_SEARCH_VALUE,
    payload: {
      searchData: data,
    },
  }
}

export const getAllDataFilter = () => {
  return async (dispatch) => {
    const data = await servicesGetAllDataFilter()
    const action = {
      type: GET_ALL_DATA_FILTER,
      payload: {
        dataFilter: data
      },
    }
    await dispatch(action)
  }
}

export const getAllProduct = (query) => {
  return async (dispatch) => {
    dispatch(setLoadingProduct(true))
    const data = await servicesGetAllProduct(query)
    const action = {
      type: GET_ALL_PRODUCT,
      payload: {
        productData: data
      },
    }
    await dispatch(action)
  }
}

export const getAllProject = (query) => {
  return async (dispatch) => {
    dispatch(setLoadingProduct(true))
    const data = await servicesGetAllProject(query)
    const action = {
      type: GET_ALL_PROJECT,
      payload: {
        projectData: data
      },
    }
    await dispatch(action)
  }
}

export const setLoadingProduct = (load) => {
  return async (dispatch) => {
    const action = {
      type: SET_LOADING_PRODUCT,
      payload: {
        load: load
      },
    }
    await dispatch(action)
  }
}
