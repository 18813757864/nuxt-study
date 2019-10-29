/*
 * @Author: your name
 * @Date: 2019-10-29 13:42:33
 * @LastEditTime: 2019-10-29 14:15:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \3B-mobiled:\work\nuxt-study\plugins\axios.js
 */
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAiLCJqdGkiOiI5ZWE3NjQwMWMwNDc0ZTA1ODBjY2U1NDMxNDJjMjFiMCIsIlVzZXJJRCI6IjAiLCJQaG9uZSI6IiIsIld4T3BlbklkIjoiIiwiV3hTZXNzaW9uS2V5IjoiIiwicm9sZSI6WyJDbGllbnRVc2VyIiwiIl0sIm5iZiI6MTU2NjM2MjE0NywiZXhwIjoyNTM0MDIyNzIwMDAsImlhdCI6MTU2NjM2MjE0NywiaXNzIjoiWVgiLCJhdWQiOiJZWF9MaXR0bGVfQVBQIn0.a2moARofKv9nMpwkbpCHFl184qJdCaxjF7fs7aMnZwXORJP6BQGKy_WjQ38V4PEgBuE8rOLYAQBcg0bdHdV10oYtRQw6crFcEhrUclqP0H8W9ZnWuAgZi5PNXCwkZ41k2eTFmtBdbRtsHVxq0WdS8qt4Lj1bFY_XzRhynPoOxC5hJPLWiwiF9BsMj46g-bVyBEjvtv307Gtu_zBgKaOJYsM2G7t_JFSBStPqkYUA3uCOl9L9ctyTz7hkIRxC6m_Rs3KlkRxQK4fRmXUL2-K7nzDYNLahaxvCc1-b7B5k85BHue0hsofJM7N5IIhEQcyRhPh7QWSbmEj6Fm-u9tW7SA"

export default function (app) {
    let axios = app.$axios;
   // 基本配置
    axios.defaults.timeout = 10000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.headers.Authorization = "Bearer "+ token;

    // 请求回调
    axios.onRequest(config => {})

    // 返回回调
    axios.onResponse(res => {})

    // 错误回调
    axios.onError(error => {})
  }