/*
 *
 * cache actions
 *
 */

import { cacheConstants } from '../_constants'

export const cacheAction = {
  saveCacheCategory
}

function saveCacheCategory(key, value) {
  return {
    type: cacheConstants.SAVE_CACHE_CATEGORY,
    key,
    value,
  }
}
