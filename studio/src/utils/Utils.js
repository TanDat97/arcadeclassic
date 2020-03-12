import {
  LOCATION_CHANGE
} from 'react-router-redux'

import DateUtils from './DateUtils'

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

const setAccount = (account_param) => {
  account = account_param
}

const isLogin = (role) => {
  if (account.user_token && account.user_scope.toLowerCase().includes(role)) {
    return true
  }
  return false
}

const isEmpty = (input) => {
  if (input === undefined || input === '' || input === null) {
    return true;
  }
  if (input.toString().replace(/\s/g, '').length) {
    return false;
  }
  return true;
}

const makeQuery = (variables) => {
  let queryString = '?'
  let data = {}
  for (let key in variables) {
    let e = variables[key]
    if (!isEmpty(e)) {
      queryString += `${key}=${e}&`
      if (key.includes('Start') || key.includes('End')) {
        const index = key.indexOf('Start') !== -1 ? key.indexOf('Start') : key.indexOf('End')
        const temp = key.substring(0, index)
        data[temp] = data[temp] || data[temp] ? data[temp] : {
          start: '',
          end: ''
        }
        data[temp].start = key.indexOf('Start') !== -1 && data[temp].start === '' ? e : data[temp].start
        data[temp].end = key.indexOf('End') !== -1 && data[temp].end === '' ? e : data[temp].end
      } else {
        data[key] = e
      }
    } else {
      data[key] = e
    }
  }
  queryString = queryString.substring(0, queryString.lastIndexOf('&'))
  return {
    query: queryString,
    data: data,
  }
}

const getDataWithKey = (keys, data) => {
  let result = []
  keys.forEach(key => {
    if(key.includes('_at')){
      result.push(DateUtils.changeDateFormat(data[key], DateUtils.DDMMYYYYhhmm))
    } else{
      result.push(data[key].toString())
    }
  })
  return result
}

export default {
  navigateToPage,
  setAccount,
  isLogin,
  isEmpty,
  makeQuery,
  getDataWithKey
}