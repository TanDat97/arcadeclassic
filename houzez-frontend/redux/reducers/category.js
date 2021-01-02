import {
  GET_CATEGORY_DETAILS,
  GET_CONDITIONS,
  GET_SOLUTIONS,
} from "../actions/category"

const initialState = {
  categoryDetailsData: {},
  conditionsData: {},
  solutionsData: {},
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default categoryReducer
