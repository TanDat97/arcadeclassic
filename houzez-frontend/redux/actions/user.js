import { getCurrencyTransfer } from "@services/packages"
/**
 * ACTIONS Types
 */
export const SAVE_USER = "SAVE_USER"
export const SAVE_USER_CURRENCY = "SAVE_USER_CURRENCY"
export const SAVE_CURRENCY_TRANSFER = "SAVE_CURRENCY_TRANSFER"
export const SAVE_USER_LANGUAGE = "SAVE_USER_LANGUAGE"
export const SAVE_AGENT_ID = "SAVE_AGENT_ID"
/**
 * ACTIONs
 */
export const saveUser = (data) => {
  return {
    type: SAVE_USER,
    payload: data,
  }
}

export const saveUserCurrency = (item) => {
  return async (dispatch) => {
    dispatch({
      type: SAVE_USER_CURRENCY,
      payload: {
        userCurrency: item,
      },
    })
  }
}

export const saveCurrencyTransfer = (currencyCode) => {
  return async (dispatch) => {
    const data = await getCurrencyTransfer(currencyCode)
    dispatch({
      type: SAVE_CURRENCY_TRANSFER,
      payload: {
        currencyTransfer: data ?? {},
      },
    })
  }
}

export const saveSystemLanguage = (data) => {
  return {
    type: SAVE_USER_LANGUAGE,
    payload: data,
  }
}

export const saveAgentId = (agentId) => {
  return {
    type: SAVE_AGENT_ID,
    payload: {
      agentId,
    },
  }
}
