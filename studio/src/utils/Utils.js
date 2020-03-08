import { LOCATION_CHANGE } from 'react-router-redux'

let account = {
  user_scope: window.localStorage.getItem('studio/scope'),
  user_token: window.localStorage.getItem('studio/token')
}

const navigateToPage = path => ({
  type: LOCATION_CHANGE,
  payload: {
    location: {
      pathname: path,
      search: '',
      hash: '',
    },
    action: 'push',
  },
});

const setAccount= (account_param) => {
  account = account_param
}

const isLogin = (role) => {
  if (account.user_token && account.user_scope.toLowerCase().includes(role)){
    return true
  }
  return false
}

export default {
  navigateToPage,
  setAccount,
  isLogin,
}