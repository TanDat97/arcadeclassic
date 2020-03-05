import axios from 'axios'

export default {
  API_REQUEST (url, headers, data, method) {
    return new Promise((resolve, reject) => {
      const config = {
        method: method,
        url: url,
        headers: headers,
        body: data
      }
      axios(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}