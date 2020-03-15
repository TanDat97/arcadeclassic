/*
 *
 * cache reducer
 *
 */

import { cacheConstants } from '../_constants'

export const initialState = {
  category: {},
  post: {},
  user: {}
}

function cache(state = initialState, action) {
  switch (action.type) {
    case cacheConstants.SAVE_CACHE_CATEGORY:
      const data = state.category
      data[action.key] = action.value
      return {
        ...state,
        category: data
      }
    default:
      return state;
  }
}

export default cache;