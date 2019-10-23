import axios from 'axios'

import { authHeader } from '../utils/authHeader'
import { Host } from './host'

export const accountService = {
  login,
  getInfoUser,
}

function login(email, password) {
  const loginParam = {
    usernameOrEmail: email,
    password: password,
  }
  return new Promise((resolve, reject) => {
    axios.post(Host + '/api/user/auth/signin', loginParam, { headers: authHeader() })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err.response))
  })
}

function getInfoUser() {
  return new Promise((resolve, reject) => {
    axios.get(Host + '/api/user/account', { headers: authHeader() })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err.response))
  })
}
