import {
  SAVE_USER,
  SAVE_USER_CURRENCY,
  SAVE_USER_LANGUAGE,
  SAVE_CURRENCY_TRANSFER,
  SAVE_AGENT_ID,
} from "../actions/user"

const initialState = {
  userInfo: {
    ssoTracking: false,
    data: false,
  },
  userCurrency: {},
  currencyTransfer: {},
  userLanguage: {},
  agentId: "",
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_USER:
        const newData = { data: action.payload.userInfo }
        const ssoTracking = action.payload.ssoTracking
        if (ssoTracking) newData.ssoTracking = true
        const oldData = state.userInfo
        return {
          ...state,
          userInfo: { ...oldData, ...newData },
        }
      case SAVE_USER_CURRENCY:
        return {
          ...state,
          userCurrency: action.payload.userCurrency,
        }
      case SAVE_CURRENCY_TRANSFER:
        return {
          ...state,
          currencyTransfer: action.payload.currencyTransfer,
        }
      case SAVE_USER_LANGUAGE:
        return {
          ...state,
          userLanguage: action.payload,
        }
      case SAVE_AGENT_ID:
        return {
          ...state,
          agentId: action.payload.agentId,
        }
      default:
        return { ...state }
    }
};

export default userReducer;
