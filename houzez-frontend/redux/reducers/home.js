import {
  GET_ALL_CURRENCY,
  SET_SEARCH_VALUE,
  GET_ALL_DATA_FILTER,
  GET_ALL_PRODUCT,
  GET_ALL_PROJECT,
  SET_LOADING_PRODUCT,
} from "../actions/home"

const initialState = {
  isLoading: false,
  currencyData: [],
  searchData: {},
  dataFilter: {},
  productData: {},
  projectData: {},
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CURRENCY:
      return { ...state, currencyData: action.payload.currencyData }
    case SET_SEARCH_VALUE:
      return { ...state, searchData: action.payload.searchData }
    case GET_ALL_DATA_FILTER:
      return { ...state, dataFilter: action.payload.dataFilter }
    case GET_ALL_PRODUCT:
      return { ...state, productData: action.payload.productData, isLoading: false }
    case GET_ALL_PROJECT:
      return { ...state, projectData: action.payload.projectData, isLoading: false }
    case SET_LOADING_PRODUCT:
      return { ...state, isLoading: action.payload.load }

    default:
      return { ...state }
  }
}

export default homeReducer
