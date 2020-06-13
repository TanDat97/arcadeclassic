import axios from 'axios'
import History from './BrowserHistory'

export default {
  API_REQUEST(url, headers, data, method = 'get') {
    return new Promise((resolve, reject) => {
      const config = {
        method: method,
        url: url,
        headers: headers === {} ? {
          'Content-Type': 'application/json',
        } : headers,
        data: data
      }
      axios(config)
        .then(res => {
          if (res.status >= 200 && res.status < 300){
            resolve(res.data)
          } else {
            reject(res.response.data)
          }
        })
        .catch(err => {
          if (!err.status) {
            reject('Service unavailable')
          } else if (err.response.status === 401 && window.location.pathname.includes('admin')) {
            History.push('/signin/admin')
          }
          reject(err.response)
        })
    })
  }
}