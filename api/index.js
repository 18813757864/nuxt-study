import axios from 'axios'
const url = window.g.axiosUrl
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAiLCJqdGkiOiI5ZWE3NjQwMWMwNDc0ZTA1ODBjY2U1NDMxNDJjMjFiMCIsIlVzZXJJRCI6IjAiLCJQaG9uZSI6IiIsIld4T3BlbklkIjoiIiwiV3hTZXNzaW9uS2V5IjoiIiwicm9sZSI6WyJDbGllbnRVc2VyIiwiIl0sIm5iZiI6MTU2NjM2MjE0NywiZXhwIjoyNTM0MDIyNzIwMDAsImlhdCI6MTU2NjM2MjE0NywiaXNzIjoiWVgiLCJhdWQiOiJZWF9MaXR0bGVfQVBQIn0.a2moARofKv9nMpwkbpCHFl184qJdCaxjF7fs7aMnZwXORJP6BQGKy_WjQ38V4PEgBuE8rOLYAQBcg0bdHdV10oYtRQw6crFcEhrUclqP0H8W9ZnWuAgZi5PNXCwkZ41k2eTFmtBdbRtsHVxq0WdS8qt4Lj1bFY_XzRhynPoOxC5hJPLWiwiF9BsMj46g-bVyBEjvtv307Gtu_zBgKaOJYsM2G7t_JFSBStPqkYUA3uCOl9L9ctyTz7hkIRxC6m_Rs3KlkRxQK4fRmXUL2-K7nzDYNLahaxvCc1-b7B5k85BHue0hsofJM7N5IIhEQcyRhPh7QWSbmEj6Fm-u9tW7SA"

export default function setAxios () {
  // 测试验证
  axios.defaults.baseURL = url
  axios.defaults.headers.Authorization = "Bearer "+ token;
  return function fetch (url, method, allParams = {}, config = {}) {
    return new Promise((resolve, reject) => {
      let params = {}
      let data = {}
      if (method === 'get') {
        params = allParams
      } else {
        data = allParams
      }
      let responseType = 'json'
      axios.request({ url, method, params, data, responseType })
        .then((res) => {
          if (res.status === 200) {
            return resolve(res.data)
          } else {
            if (!config.hideError) {
              // Message({
              //   message: res.data.desc || '服务器异常',
              //   type: 'error',
              // })
            }
            return resolve({ status: 500, msg: res.data.message })
          }
        })
        .catch((err) => {
          return resolve({ status: 406, msg: err })
        })
    })
  }
}