import axios from 'axios'
import qs from 'qs'

const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      console.log(
        '语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。'
      )
      break
    case 401:
      // token:令牌
      console.log('服务器认证失败')
      break
    case 403:
      console.log('服务器已经理解请求，但是拒绝执行它')
      break
    case 404:
      console.log('请检查网络请求地址')
      break
    case 500:
      console.log(
        '服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。'
      )
      break
    case 502:
      console.log(
        '作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。'
      )
      break
    default:
      console.log(info)
      break
  }
}
// 服务器慢,设置久一些
axios.defaults.timeout = 800000
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('PrintingTools/') != -1) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      }
    } else {
      config.headers = {
        'Content-Type': 'application/json',
        auth: localStorage.getItem('token_51'),
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)
// 响应拦截
axios.interceptors.response.use(
  // 完成了
  (response) =>
    response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response),
  (error) => {
    const { response } = error
    errorHandle(response.status, response.info)
  }
)
export function post_(url, params) {
  return new Promise((resolve, reject) => {
    console.log(url, 'params')
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function get_(url, params) {
  return new Promise((resolve, reject) => {
    // console.log('打印token', localStorage.getItem('token'))
    axios
      .get(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
