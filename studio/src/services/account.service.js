import axios from 'axios';

import { authHeader } from '../utils/authHeader';
import { Host } from './host';

export const accountService = {
  login,
};

function login(email, password) {
  const loginParam = {
    usernameOrEmail: email,
    password: password,
  }
  return new Promise((resolve, reject) => {
    axios.post(Host + '/api/auth/signin', loginParam, { headers: authHeader() })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err.response.data))
  });
}
